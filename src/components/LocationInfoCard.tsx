import { useEffect, useState } from 'react';
import { StationInfo } from '../functions';
import axios from 'axios';
import { LatLng } from 'leaflet';
import tz_lookup from 'tz-lookup';

export async function retrieveLocationData(
	setter: Function,
	loc: string,
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

	const [latitude, longitude] = loc.split(',');
	const timezone = tz_lookup(parseFloat(latitude), parseFloat(longitude));

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
	// 		latitude,
	// 		longitude,
	// 		current: params.marine.now.join(','),
	// 		hourly: params.marine.hourly.join(','),
	// 		daily: params.marine.daily.join(','),
	// 		length_unit,
	// 		timezone,
	// 	},
	// 	withCredentials: false,
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

	// axios({
	// 	method: 'GET',
	// 	url: 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter',
	// 	params: {
	// 		station: props.id,
	// 		date: 'latest',
	// 		product: 'air_temperature',
	// 		units: 'english',
	// 		time_zone: 'lst_ldt',
	// 		format: 'json',
	// 	},
	// })
	// 	.then((response) => {
	// 		if (response.status === 200) {
	// 			newData.now.airTemperature = parseFloat(response.data.data[0].v);
	// 			setData(newData);
	// 		}
	// 	})
	// 	.catch((err) => console.error(err));
}

export function LocationInfoCard(props: { id: string }) {
	const [data, setData] = useState<StationInfo | null>(null);

	// useEffect(() => {
	// 	if (!data) retrieveLocationData(setData, );
	// });

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
