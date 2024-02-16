import axios, { AxiosResponse } from 'axios';
import { LatLng } from 'leaflet';
import tz_lookup from 'tz-lookup';

import { DataSerializableType, MetadataSerializableType } from '../app/stationData';
import { degToCard } from './Direction';
import { StationMetadata } from '../pages';

export * from './Direction';

type DirectionInfo = {
	degrees: number;
	cardinal: string;
};

export type WindInfo = {
	baseSpeed: number;
	gustSpeed: number;
	direction: DirectionInfo;
};

type BaseInfo = {
	airTemperature: number;
	airTemperatureApparent: number;
	cloudiness: string;
	precipitation: {
		type: string;
		chance: number;
	};
	wind: WindInfo;
};

export type StationInfo = {
	id: string;
	state: string;
	name: string; // city
	latLong: {
		lat: number;
		lng: number;
	};
	now: BaseInfo & {
		isDay: boolean;
		waterTemperature?: number;
		tideHistory: {
			t: string; // datetime of record
			v: number; // ft above low water datum
		}[];
		visibility: number; // Miles
		airQuality: number; // PPM
	};
	todaySunrise: string;
	todaySunset: string;
	// forecastHourly: (BaseInfo & {
	// 	tideLevel: number;
	// })[];
	// forecastDaily: []; // TODO
};

/**
 * TODO
 * @returns
 */
export async function retrieveCurrentStations(): Promise<MetadataSerializableType> {
	const out: MetadataSerializableType = {};
	const response = await axios({
		method: 'GET',
		url: 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json'
	});

	if (response.status === 200) {
		const greatLakesStations = response.data.stations.filter((station: { [key: string]: string }) => station.greatlakes);
		greatLakesStations.forEach((station: StationNOAA) => {
			out[station.id] = {
				city: station.name,
				state: station.state,
				coords: {
					lat: station.lat,
					lng: station.lng
				}
			};
		});

		return out;
	} else throw new Error(`Could not retrieve station data. Response received with code ${response.status}`);
}

type StationNOAA = {
	id: string;
	name: string;
	state: string;
	greatlakes: boolean;
	lat: number;
	lng: number;
};

/**
 * TODO
 * @returns
 */
export async function fetchStationCoordinates(): Promise<Map<string, StationMetadata>> {
	const response = await axios({
		url: 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json',
		method: 'GET',
		withCredentials: false
	});

	if (response.status === 200) {
		const stationCoordsBuilder: Map<string, StationMetadata> = new Map();
		response.data.stations.forEach((station: StationNOAA) => {
			if (station.greatlakes) {
				stationCoordsBuilder.set(station.id, {
					city: station.name,
					state: station.state,
					coords: new LatLng(station.lat, station.lng)
				});
			}
		});

		return stationCoordsBuilder;
	}

	return new Map();
}

/**
 * TODO
 * @param locs
 * @param locMetadata
 * @param temperature_unit
 * @param windspeed_unit
 * @param precipitation_unit
 * @param length_unit
 * @returns
 */
export async function retrieveLocationData(
	locs: string[],
	locMetadata: MetadataSerializableType,
	temperature_unit: 'fahrenheit' | 'celcius',
	windspeed_unit: 'mph' | 'kph' | 'm/s',
	precipitation_unit: 'inch' | 'cm',
	length_unit: 'imperial' | 'metric'
): Promise<DataSerializableType> {
	const atmos_url = 'https://api.open-meteo.com/v1/forecast',
		marine_url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter',
		air_quality_url = 'https://air-quality-api.open-meteo.com/v1/air-quality';
	const atmosParams = {
		now: [
			'temperature_2m',
			'apparent_temperature',
			'is_day',
			'precipitation',
			'cloudcover',
			'visibility',
			'windspeed_10m',
			'winddirection_10m',
			'windgusts_10m'
		],
		hourly: [
			'temperature_2m',
			'apparent_temperature',
			'precipitation',
			'precipitation_probability',
			'cloudcover',
			'visibility',
			'windspeed_10m',
			'winddirection_10m',
			'windgusts_10m',
			'uv_index',
			'is_day'
		],
		daily: [
			'temperature_2m_max',
			'temperature_2m_min',
			'precipitation_probability_max',
			'windspeed_10m_max',
			'winddirection_10m_dominant',
			'sunrise',
			'sunset'
		]
	};

	const promisesByStation: { [id: string]: Promise<AxiosResponse[]> } = {};

	for (const id of locs) {
		const latitude = locMetadata[id].coords.lat,
			longitude = locMetadata[id].coords.lng;
		const timezone = tz_lookup(latitude, longitude);

		const locationInfoResponseAtmos = axios({
			url: atmos_url,
			method: 'GET',
			params: {
				latitude,
				longitude,
				timezone,
				current: atmosParams.now.join(','),
				hourly: atmosParams.hourly.join(','),
				daily: atmosParams.daily.join(','),
				temperature_unit,
				windspeed_unit,
				precipitation_unit
			},
			withCredentials: false
		});

		const waterLevelResponse = axios({
			url: marine_url,
			method: 'GET',
			params: {
				station: id,
				range: 24,
				product: 'water_level',
				datum: 'LWD',
				units: 'english',
				time_zone: 'lst_ldt',
				format: 'json'
			}
		});

		const waterTempResponse = axios({
			url: marine_url,
			method: 'GET',
			params: {
				station: id,
				date: 'latest',
				product: 'water_temperature',
				units: 'english',
				time_zone: 'lst_ldt',
				format: 'json'
			}
		});

		const locationInfoResponseAQI = axios({
			url: air_quality_url,
			method: 'GET',
			params: {
				latitude,
				longitude,
				current: 'us_aqi',
				domains: 'cams_global'
			},
			withCredentials: false
		});

		promisesByStation[id] = Promise.all([
			locationInfoResponseAtmos,
			waterLevelResponse,
			waterTempResponse,
			locationInfoResponseAQI
		]); // concurrently send all requests
	}

	const out: DataSerializableType = {};

	for (const [id, promises] of Object.entries(promisesByStation)) {
		const apiData = await promises;
		if (apiData.some((response) => response.status !== 200)) {
			console.error(`Unable to retrieve some information for station ${id}`);
			console.log(apiData);
			// TODO: handle missing data
		} else {
			out[id] = {
				id,
				state: locMetadata[id].state,
				name: locMetadata[id].city,
				latLong: locMetadata[id].coords,
				now: {
					airTemperature: apiData[0].data.current.temperature_2m,
					airTemperatureApparent: apiData[0].data.current.apparent_temperature,
					cloudiness: apiData[0].data.current.cloudcover,
					precipitation: {
						type: 'TODO',
						chance: apiData[0].data.current.precipitation
					},
					wind: {
						baseSpeed: apiData[0].data.current.windspeed_10m,
						gustSpeed: apiData[0].data.current.windgusts_10m,
						direction: {
							degrees: apiData[0].data.current.winddirection_10m,
							cardinal: degToCard(apiData[0].data.current.winddirection_10m)
						}
					},
					isDay: apiData[0].data.current.is_day === 1,
					waterTemperature: apiData[2].data.data ? apiData[2].data.data[0].v : undefined,
					tideHistory: apiData[1].data.data,
					visibility: apiData[0].data.current.visibility,
					airQuality: apiData[3].data.current.us_aqi
				},
				todaySunrise: apiData[0].data.daily.sunrise[0],
				todaySunset: apiData[0].data.daily.sunset[0]
				// forecastHourly: [], // TODO
				// forecastDaily: [], // TODO
			};
		}
	}

	return out;
}

export type LocationDMS = {
	degrees: number;
	minutes: number;
	seconds?: number;
	direction: 'N' | 'E' | 'S' | 'W';
};

/**
 * Convert latitude/longitude degrees to decimals. TODO: remove if unnecessary
 * @param loc an object containing {@link LocationDMS} information for a lat/long coordinate
 * @returns an array containing the latitude and longitude of {@link loc}, converted to floating point numbers
 */
export function latLongDegreesToDecimal(loc: { latitudeDMS: LocationDMS; longitudeDMS: LocationDMS }): LatLng {
	const resultLat = loc.latitudeDMS,
		resultLong = loc.longitudeDMS;
	for (const resultLoc of [resultLat, resultLong]) {
		resultLoc.minutes /= 60;
		if (resultLoc.seconds) {
			resultLoc.seconds /= 3600;
		} else resultLoc.seconds = 0;
		resultLoc.degrees += resultLoc.minutes + resultLoc.seconds;
		if (['S', 'W'].includes(resultLoc.direction)) {
			resultLoc.degrees *= -1;
		}
	}

	return new LatLng(resultLat.degrees, resultLong.degrees);
}
