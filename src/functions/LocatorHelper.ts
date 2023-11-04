import axios from 'axios';
import usZips from 'us-zips';
import tzlookup from 'tz-lookup';

import { LocationInfo } from '../lib/types';
import { Feature } from 'geojson';
import { LocationType } from '../components';

const atmos_url = 'https://api.open-meteo.com/v1',
	marine_url = 'https://marine-api.open-meteo.com/v1/marine',
	hourlyParams = [
		'temperature_2m',
		'apparent_temperature',
		'precipitation_probability',
		'precipitation',
		'cloudcover',
		'visibility',
		'windspeed_10m',
		'winddirection_10m',
		'windgusts_10m',
		'uv_index',
		'is_day',
	],
	dailyParams = ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset'];

export async function queryLocation(
	loc: string,
	locType: LocationType,
	temperature_unit: 'fahrenheit' | 'celcius',
	windspeed_unit: 'mph' | 'kph' | 'm/s',
	precipitation_unit: 'inch' | 'cm'
): Promise<LocationInfo> {
	if (locType === 'latLong' && !loc.match(/[0-9]{2}\./)) {
	} else if (locType === 'zipCode' && !loc.match(/[0-9]{5}/)) {
		throw new Error(`Invalid zip code provided: ${loc}. Please only use the first 5 digits`);
	}

	const [latitude, longitude] = loc.split(',');
	const locationInfoResponse = await axios<Feature>({
		url: `${atmos_url}/forecast`,
		method: 'GET',
		params: {
			latitude,
			longitude,
			timezone: tzlookup(parseFloat(latitude), parseFloat(longitude)),
			hourly: hourlyParams.join(','),
			daily: dailyParams.join(','),
			temperature_unit,
			windspeed_unit,
			precipitation_unit,
		},
		withCredentials: false,
	});

	if (locationInfoResponse.status !== 200) {
		console.error(`Unable to retrieve information for ${loc}`);
	} else {
		console.log(locationInfoResponse.data);

		// TODO: query ??? and forecastHourly for temp/wind forecasts
	}

	return {};
}
