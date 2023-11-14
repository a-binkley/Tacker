import axios from 'axios';
import { LatLng } from 'leaflet';
import { StationMetadata } from '../pages';

export * from './Direction';

type DirectionInfo = {
	degrees: number;
	cardinal: string;
};

type BaseInfo = {
	airTemperature: number;
	airTemperatureApparent: number;
	cloudiness: string;
	precipitation: {
		type: string;
		chance: number;
	};
	wind: {
		baseSpeed: number;
		gustSpeed: number;
		direction: DirectionInfo;
	};
};

export type StationInfo = {
	id: string;
	state: string;
	name: string; // city
	latLong: LatLng;
	now: BaseInfo & {
		waterTemperature: number;
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

export async function retrieveCurrentStations(setter: Function): Promise<StationInfo[]> {
	axios({
		method: 'GET',
		url: 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json',
	})
		.then((response: { status: number; data: { stations: any[] } }) => {
			if (response.status === 200) {
				const greatLakesStations = response.data.stations.filter(
					(station: { [key: string]: string }) => station.greatlakes
				);
				setter(
					greatLakesStations.map((station: StationInfo & { lat: number; lng: number }) => ({
						id: station.id,
						state: station.state,
						name: station.name,
						latLong: new LatLng(station.lat, station.lng),
					}))
				);
			} else throw new Error(`Could not retrieve station data. Response received with code ${response.status}`);
		})
		.catch((err: any) => {
			console.error(err);
			throw err; // STUB
		});
	return [];
}

type StationNOAA = {
	id: string;
	name: string;
	state: string;
	greatlakes: boolean;
	lat: number;
	lng: number;
};

export async function fetchStationCoordinates(setter: Function) {
	const response = await axios({
		url: 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json',
		method: 'GET',
		withCredentials: false,
	});

	if (response.status === 200) {
		const stationCoordsBuilder: Map<string, StationMetadata> = new Map();
		response.data.stations.forEach((station: StationNOAA) => {
			if (station.greatlakes) {
				stationCoordsBuilder.set(station.id, {
					city: station.name,
					state: station.state,
					coords: new LatLng(station.lat, station.lng),
				});
			}
		});

		setter(stationCoordsBuilder);
	}
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
