import { useEffect, useState } from 'react';
import { StationInfo, degToCard } from '../functions';
import axios from 'axios';
import { LatLng } from 'leaflet';
import tz_lookup from 'tz-lookup';
import { StationMetadata } from '../pages';

export async function retrieveLocationData(
	setter: (data: StationInfo) => void,
	loc: string,
	locMetadata: StationMetadata,
	temperature_unit: 'fahrenheit' | 'celcius',
	windspeed_unit: 'mph' | 'kph' | 'm/s',
	precipitation_unit: 'inch' | 'cm',
	length_unit: 'imperial' | 'metric'
) {
	const atmos_url = 'https://api.open-meteo.com/v1/forecast',
		marine_url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter',
		air_quality_url = 'https://air-quality-api.open-meteo.com/v1/air-quality';
	const params = {
		atmos: {
			now: [
				'temperature_2m',
				'apparent_temperature',
				'is_day',
				'precipitation',
				'cloudcover',
				'visibility',
				'windspeed_10m',
				'winddirection_10m',
				'windgusts_10m',
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
				'is_day',
			],
			daily: [
				'temperature_2m_max',
				'temperature_2m_min',
				'precipitation_probability_max',
				'windspeed_10m_max',
				'winddirection_10m_dominant',
				'sunrise',
				'sunset',
			],
		},
		marine: {
			now: ['wave_height', 'wave_direction', 'wave_period'],
			hourly: ['wave_height', 'wave_direction', 'wave_period'],
			daily: ['wave_height_max', 'wave_direction_dominant', 'wave_period_max'],
		},
	};

	const latitude = locMetadata.coords.lat,
		longitude = locMetadata.coords.lng;
	const timezone = tz_lookup(latitude, longitude);

	const locationInfoResponseAtmos = await axios({
		url: atmos_url,
		method: 'GET',
		params: {
			latitude,
			longitude,
			timezone,
			current: params.atmos.now.join(','),
			hourly: params.atmos.hourly.join(','),
			daily: params.atmos.daily.join(','),
			temperature_unit,
			windspeed_unit,
			precipitation_unit,
		},
		withCredentials: false,
	});

	// const locationInfoResponseMarine = await axios({
	// 	url: marine_url,
	// 	method: 'GET',
	// 	params: {
	// 		station: loc,
	// 		date: 'latest',
	// 		product: 'air_temperature',
	// 		units: 'english',
	// 		time_zone: 'lst_ldt',
	// 		format: 'json',
	// 	},
	// 	// 	withCredentials: false,
	// });

	const locationInfoResponseAQI = await axios({
		url: air_quality_url,
		method: 'GET',
		params: {
			latitude,
			longitude,
			current: 'us_aqi',
			domains: 'cams_global',
		},
		withCredentials: false,
	});

	if (locationInfoResponseAtmos.status !== 200) {
		console.error(`Unable to retrieve atmospheric information for station ${loc}`);
		// } else if (locationInfoResponseMarine.status !== 200) {
		// 	console.error(`Unable to retrieve marine information for station ${loc}`);
	} else if (locationInfoResponseAQI.status !== 200) {
		console.error(`Unable to retrieve AQI information for station ${loc}`);
	} else {
		setter({
			id: loc,
			state: locMetadata.state,
			name: locMetadata.city,
			latLong: locMetadata.coords,
			now: {
				airTemperature: locationInfoResponseAtmos.data.current.temperature_2m,
				airTemperatureApparent: locationInfoResponseAtmos.data.current.apparent_temperature,
				cloudiness: locationInfoResponseAtmos.data.current.cloudcover,
				precipitation: {
					type: 'TODO',
					chance: locationInfoResponseAtmos.data.current.precipitation,
				},
				wind: {
					baseSpeed: locationInfoResponseAtmos.data.current.windspeed_10m,
					gustSpeed: locationInfoResponseAtmos.data.current.windgusts_10m,
					direction: {
						degrees: locationInfoResponseAtmos.data.current.winddirection_10m,
						cardinal: degToCard(locationInfoResponseAtmos.data.current.winddirection_10m),
					},
				},
				waterTemperature: -1,
				// waveInfo: {
				// 	height: locationInfoResponseMarine.data.current.wave_height,
				// 	direction: {
				// 		degrees: locationInfoResponseMarine.data.current.wave_direction,
				// 		cardinal: degToCard(locationInfoResponseMarine.data.current.wave_direction),
				// 	},
				// 	period: locationInfoResponseMarine.data.current.wave_period,
				// },
				tideLevel: -1,
				visibility: locationInfoResponseAtmos.data.current.visibility,
				airQuality: locationInfoResponseAQI.data.current.us_aqi,
			},
			todaySunrise: locationInfoResponseAtmos.data.daily.sunrise[0],
			todaySunset: locationInfoResponseAtmos.data.daily.sunset[0],
			forecastHourly: [], // TODO
			forecastDaily: [], // TODO
		});
	}
}

export function LocationInfoCard(props: {
	id: string;
	metadata: StationMetadata;
	position: number;
	changePosition: (position: number) => void;
	neighbors: string[];
}) {
	const [data, setData] = useState<StationInfo | null>(null);

	useEffect(() => {
		if (!data) retrieveLocationData(setData, props.id, props.metadata, 'fahrenheit', 'mph', 'inch', 'imperial');
	});

	if (data) {
		return (
			<div className="location-info-card-wrapper">
				<h2>{`${data.name}, ${data.state}`}</h2>
				<h3>{`${data.latLong.lat},${data.latLong.lng}`}</h3>
				{/* {Object.keys(data).map((key) => (
					<p>{`${key}: ${data[key as keyof StationInfo]}`}</p>
				))} */}
				<p>{`Air Temperature: ${data.now.airTemperature} °F`}</p>
			</div>
		);
	} else {
		return (
			<>
				<p>{`No data present for station ID ${props.id}`}</p>
			</>
		);
	}
}
