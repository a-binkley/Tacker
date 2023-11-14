import { useEffect, useState } from 'react';
import { StationInfo, degToCard } from '../functions';
import axios from 'axios';
import { LatLng } from 'leaflet';
import tz_lookup from 'tz-lookup';
import { StationMetadata } from '../pages';

import './LocationInfoCard.css';

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
	};

	const latitude = locMetadata.coords.lat,
		longitude = locMetadata.coords.lng;
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
			precipitation_unit,
		},
		withCredentials: false,
	});

	const waterLevelResponse = axios({
		url: marine_url,
		method: 'GET',
		params: {
			station: loc,
			range: 24,
			product: 'water_level',
			datum: 'LWD',
			units: 'english',
			time_zone: 'lst_ldt',
			format: 'json',
		},
	});

	const locationInfoResponseAQI = axios({
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

	Promise.all([locationInfoResponseAtmos, waterLevelResponse, locationInfoResponseAQI]).then((promises) => {
		const infoTypes = ['atmospheric', 'marine', 'AQI'];

		for (let i = 0; i < promises.length; i++) {
			if (promises[i].status !== 200) {
				console.error(`Unable to retrieve ${infoTypes[i]} information for station ${loc}`);
				// TODO: handle missing data
			}
		}

		setter({
			id: loc,
			state: locMetadata.state,
			name: locMetadata.city,
			latLong: locMetadata.coords,
			now: {
				airTemperature: promises[0].data.current.temperature_2m,
				airTemperatureApparent: promises[0].data.current.apparent_temperature,
				cloudiness: promises[0].data.current.cloudcover,
				precipitation: {
					type: 'TODO',
					chance: promises[0].data.current.precipitation,
				},
				wind: {
					baseSpeed: promises[0].data.current.windspeed_10m,
					gustSpeed: promises[0].data.current.windgusts_10m,
					direction: {
						degrees: promises[0].data.current.winddirection_10m,
						cardinal: degToCard(promises[0].data.current.winddirection_10m),
					},
				},
				waterTemperature: -1,
				tideHistory: promises[1].data.data,
				visibility: promises[0].data.current.visibility,
				airQuality: promises[2].data.current.us_aqi,
			},
			todaySunrise: promises[0].data.daily.sunrise[0],
			todaySunset: promises[0].data.daily.sunset[0],
			// forecastHourly: [], // TODO
			// forecastDaily: [], // TODO
		});
	});
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
				<div
					className="wave-background"
					style={{
						animation: `wave ${30 / data.now.wind.baseSpeed}s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite`, // because why not
					}}
				/>
				<h2 className="city-state-header">{`${data.name}, ${data.state}`}</h2>
				<h3 className="lat-long-header">{`${data.latLong.lat.toFixed(3)},${data.latLong.lng.toFixed(3)}`}</h3>
				<div className="wind-info-wrapper">
					<img
						className="wind-arrow"
						src={process.env.PUBLIC_URL + '/img/CompassArrowHollow.png'}
						alt="arrow"
						style={{ rotate: `${(data.now.wind.direction.degrees + 180) % 360}deg` }}
					/>
					<h4 className="wind-speed-header">{Math.round(data.now.wind.baseSpeed)}</h4>
					<p className="wind-speed-units">mph</p>
				</div>
				{/* {Object.keys(data).map((key) => (
					<p>{`${key}: ${data[key as keyof StationInfo]}`}</p>
				))} */}
				{/* <p>{`Air Temperature: ${data.now.airTemperature} °F`}</p> */}
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
