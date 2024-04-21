import { degToCard } from '.';
import { MetadataSerializableType } from '../app/stationData';

export const rejection = { status: 429 };

export const apiResponseNOAA = {
	count: 2,
	units: null,
	stations: [
		{
			tidal: true,
			greatlakes: false,
			state: 'HI',
			timezone: 'HAST',
			timezonecorr: -10,
			id: '1611400',
			name: 'Nawiliwili',
			lat: 21.9544,
			lng: -159.3561
		},
		{
			tidal: true,
			greatlakes: false,
			state: 'HI',
			timezone: 'HAST',
			timezonecorr: -10,
			id: '1612340',
			name: 'Honolulu',
			lat: 21.303333,
			lng: -157.864528
		},
		{
			tidal: false,
			greatlakes: true,
			state: 'MI',
			timezone: 'EST',
			timezonecorr: -5,
			id: '9075080',
			name: 'Mackinaw City',
			lat: 45.777222,
			lng: -84.721107
		},
		{
			tidal: false,
			greatlakes: true,
			state: 'MI',
			timezone: 'EST',
			timezonecorr: -5,
			id: '9014087',
			name: 'Dry Dock',
			lat: 42.945278,
			lng: -82.443333
		}
	]
};

export const mockRetrieveLocationDataArgs: { locs: string[]; locMetadata: MetadataSerializableType } = {
	locs: ['1611400', '1612340', '9075080', '9014087'],
	locMetadata: {
		'1611400': {
			city: 'foo1',
			state: 'bar1',
			coords: {
				lat: 21.9544,
				lng: -159.3561
			}
		},
		'1612340': {
			city: 'foo2',
			state: 'bar2',
			coords: {
				lat: 21.303333,
				lng: -157.864528
			}
		},
		'9075080': {
			city: 'Mackinaw City',
			state: 'MI',
			coords: {
				lat: 45.777222,
				lng: -84.721107
			}
		},
		'9014087': {
			city: 'Dry Dock',
			state: 'MI',
			coords: {
				lat: 42.945278,
				lng: -82.443333
			}
		}
	}
};

type ApiResponseTypeOpenMeteo = {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_units: {
		time: 'iso8601';
		interval: string;
		temperature_2m: '°C' | '°F';
		apparent_temperature: '°C' | '°F';
		is_day: string;
		precipitation: 'inch' | 'mm';
		cloudcover: '%';
		visibility: 'ft' | 'm';
		windspeed_10m: 'mp/h' | 'km/h' | 'm/s' | 'kn';
		winddirection_10m: '°';
		windgusts_10m: 'mp/h' | 'km/h' | 'm/s' | 'kn';
	};
	current: {
		time: string;
		interval: number;
		temperature_2m: number;
		apparent_temperature: number;
		is_day: 0 | 1;
		cloudcover: number;
		visibility: number;
		windspeed_10m: number;
		winddirection_10m: number;
		windgusts_10m: number;
	};
	hourly_units: {
		time: 'iso8601';
		temperature_2m: '°C' | '°F';
		apparent_temperature: '°C' | '°F';
		precipitation_probability: '%';
		precipitation: 'inch' | 'mm';
		cloudcover: '%';
		visibility: 'ft' | 'm';
		windspeed_10m: 'mp/h' | 'km/h' | 'm/s' | 'kn';
		winddirection_10m: '°';
		windgusts_10m: 'mp/h' | 'km/h' | 'm/s' | 'kn';
		uv_index: string;
		is_day: string;
	};
	hourly: {
		time: string[];
		temperature_2m: number[];
		apparent_temperature: number[];
		precipitation_probability: number[];
		precipitation: number[];
		cloudcover: number[];
		visibility: number[];
		windspeed_10m: number[];
		winddirection_10m: number[];
		windgusts_10m: number[];
		uv_index: number[];
		is_day: number[];
	};
	daily_units: {
		time: 'iso8601';
		temperature_2m_max: '°C' | '°F';
		temperature_2m_min: '°C' | '°F';
		sunrise: 'iso8601';
		sunset: 'iso8601';
	};
	daily: {
		time: string[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
		sunrise: string[];
		sunset: string[];
	};
};

export const apiResponsesOpenMeteoAtmos: { [id: string]: ApiResponseTypeOpenMeteo } = {
	'9075080': {
		latitude: 45.76018,
		longitude: -84.7348,
		generationtime_ms: 5.542993545532227,
		utc_offset_seconds: -18000,
		timezone: 'America/New_York',
		timezone_abbreviation: 'EST',
		elevation: 177.0,
		current_units: {
			time: 'iso8601',
			interval: 'seconds',
			temperature_2m: '°F',
			apparent_temperature: '°F',
			is_day: '',
			precipitation: 'inch',
			cloudcover: '%',
			visibility: 'ft',
			windspeed_10m: 'mp/h',
			winddirection_10m: '°',
			windgusts_10m: 'mp/h'
		},
		current: {
			time: '2024-02-16T13:45',
			interval: 900,
			temperature_2m: 23.1,
			apparent_temperature: 15.0,
			is_day: 1,
			cloudcover: 100,
			visibility: 79068.242,
			windspeed_10m: 5.6,
			winddirection_10m: 293,
			windgusts_10m: 11.2
		},
		hourly_units: {
			time: 'iso8601',
			temperature_2m: '°F',
			apparent_temperature: '°F',
			precipitation_probability: '%',
			precipitation: 'inch',
			cloudcover: '%',
			visibility: 'ft',
			windspeed_10m: 'mp/h',
			winddirection_10m: '°',
			windgusts_10m: 'mp/h',
			uv_index: '',
			is_day: ''
		},
		hourly: {
			time: ['2024-02-16T00:00', '2024-02-16T01:00'],
			temperature_2m: [24.6, 25.3],
			apparent_temperature: [12.4, 12.4],
			precipitation_probability: [9, 13],
			precipitation: [0.0, 0.0],
			cloudcover: [8, 99],
			visibility: [83005.25, 84645.672],
			windspeed_10m: [15.2, 17.0],
			winddirection_10m: [287, 298],
			windgusts_10m: [29.5, 29.3],
			uv_index: [0.0, 0.0],
			is_day: [0, 0]
		},
		daily_units: {
			time: 'iso8601',
			temperature_2m_max: '°F',
			temperature_2m_min: '°F',
			sunrise: 'iso8601',
			sunset: 'iso8601'
		},
		daily: {
			time: ['2024-02-16', '2024-02-17', '2024-02-18', '2024-02-19', '2024-02-20', '2024-02-21', '2024-02-22'],
			temperature_2m_max: [25.3, 23.7, 30.9, 30.3, 31.1, 35.7, 35.5],
			temperature_2m_min: [16.1, 7.6, 20.7, 17.8, 23.3, 30.5, 26.1],
			sunrise: [
				'2024-02-16T07:39',
				'2024-02-17T07:38',
				'2024-02-18T07:36',
				'2024-02-19T07:34',
				'2024-02-20T07:33',
				'2024-02-21T07:31',
				'2024-02-22T07:30'
			],
			sunset: [
				'2024-02-16T18:06',
				'2024-02-17T18:07',
				'2024-02-18T18:08',
				'2024-02-19T18:10',
				'2024-02-20T18:11',
				'2024-02-21T18:13',
				'2024-02-22T18:14'
			]
		}
	},
	'9014087': {
		latitude: 42.933098,
		longitude: -82.451904,
		generationtime_ms: 0.8400678634643555,
		utc_offset_seconds: -18000,
		timezone: 'America/New_York',
		timezone_abbreviation: 'EST',
		elevation: 180.0,
		current_units: {
			time: 'iso8601',
			interval: 'seconds',
			temperature_2m: '°F',
			apparent_temperature: '°F',
			is_day: '',
			precipitation: 'inch',
			cloudcover: '%',
			visibility: 'ft',
			windspeed_10m: 'mp/h',
			winddirection_10m: '°',
			windgusts_10m: 'mp/h'
		},
		current: {
			time: '2024-02-16T14:00',
			interval: 900,
			temperature_2m: 32.1,
			apparent_temperature: 23.4,
			is_day: 1,
			cloudcover: 100,
			visibility: 155839.891,
			windspeed_10m: 6.1,
			winddirection_10m: 294,
			windgusts_10m: 11.0
		},
		hourly_units: {
			time: 'iso8601',
			temperature_2m: '°F',
			apparent_temperature: '°F',
			precipitation_probability: '%',
			precipitation: 'inch',
			cloudcover: '%',
			visibility: 'ft',
			windspeed_10m: 'mp/h',
			winddirection_10m: '°',
			windgusts_10m: 'mp/h',
			uv_index: '',
			is_day: ''
		},
		hourly: {
			time: ['2024-02-16T00:00', '2024-02-16T01:00'],
			temperature_2m: [24.6, 25.3],
			apparent_temperature: [12.4, 12.4],
			precipitation_probability: [9, 13],
			precipitation: [0.0, 0.0],
			cloudcover: [8, 99],
			visibility: [83005.25, 84645.672],
			windspeed_10m: [15.2, 17.0],
			winddirection_10m: [287, 298],
			windgusts_10m: [29.5, 29.3],
			uv_index: [0.0, 0.0],
			is_day: [0, 0]
		},
		daily_units: {
			time: 'iso8601',
			temperature_2m_max: '°F',
			temperature_2m_min: '°F',
			sunrise: 'iso8601',
			sunset: 'iso8601'
		},
		daily: {
			time: ['2024-02-16', '2024-02-17', '2024-02-18', '2024-02-19', '2024-02-20', '2024-02-21', '2024-02-22'],
			temperature_2m_max: [32.7, 25.2, 38.7, 39.3, 45.4, 45.0, 45.9],
			temperature_2m_min: [22.8, 19.1, 22.6, 27.0, 31.4, 35.5, 34.5],
			sunrise: [
				'2024-02-16T07:25',
				'2024-02-17T07:24',
				'2024-02-18T07:23',
				'2024-02-19T07:21',
				'2024-02-20T07:20',
				'2024-02-21T07:18',
				'2024-02-22T07:17'
			],
			sunset: [
				'2024-02-16T18:01',
				'2024-02-17T18:02',
				'2024-02-18T18:04',
				'2024-02-19T18:05',
				'2024-02-20T18:06',
				'2024-02-21T18:08',
				'2024-02-22T18:09'
			]
		}
	}
};

export const apiResponseOpenMeteoAtmosAlt: { [id: string]: ApiResponseTypeOpenMeteo } = {
	'9014087': {
		latitude: 42.933098,
		longitude: -82.451904,
		generationtime_ms: 0.24700164794921875,
		utc_offset_seconds: -18000,
		timezone: 'America/New_York',
		timezone_abbreviation: 'EST',
		elevation: 180.0,
		current_units: {
			time: 'iso8601',
			interval: 'seconds',
			temperature_2m: '°C',
			apparent_temperature: '°C',
			is_day: '',
			precipitation: 'mm',
			cloudcover: '%',
			visibility: 'm',
			windspeed_10m: 'km/h',
			winddirection_10m: '°',
			windgusts_10m: 'km/h'
		},
		current: {
			time: '2024-02-16T14:30',
			interval: 900,
			temperature_2m: 0.2,
			apparent_temperature: -4.6,
			is_day: 1,
			cloudcover: 100,
			visibility: 48200.0,
			windspeed_10m: 9.5,
			winddirection_10m: 299,
			windgusts_10m: 17.6
		},
		hourly_units: {
			time: 'iso8601',
			temperature_2m: '°C',
			apparent_temperature: '°C',
			precipitation_probability: '%',
			precipitation: 'mm',
			cloudcover: '%',
			visibility: 'm',
			windspeed_10m: 'km/h',
			winddirection_10m: '°',
			windgusts_10m: 'km/h',
			uv_index: '',
			is_day: ''
		},
		hourly: {
			time: ['2024-02-16T00:00', '2024-02-16T01:00'],
			temperature_2m: [-1.7, -2.2],
			apparent_temperature: [-6.8, -7.6],
			precipitation_probability: [0, 0],
			precipitation: [0.0, 0.0],
			cloudcover: [83, 0],
			visibility: [29800.0, 28600.0],
			windspeed_10m: [13.8, 15.0],
			winddirection_10m: [290, 287],
			windgusts_10m: [42.1, 42.1],
			uv_index: [0.0, 0.0],
			is_day: [0, 0]
		},
		daily_units: {
			time: 'iso8601',
			temperature_2m_max: '°C',
			temperature_2m_min: '°C',
			sunrise: 'iso8601',
			sunset: 'iso8601'
		},
		daily: {
			time: ['2024-02-16', '2024-02-17', '2024-02-18', '2024-02-19', '2024-02-20', '2024-02-21', '2024-02-22'],
			temperature_2m_max: [0.4, -3.8, 3.3, 3.6, 6.9, 6.5, 7.9],
			temperature_2m_min: [-5.1, -7.2, -5.2, -3.1, -1.3, 1.3, 4.4],
			sunrise: [
				'2024-02-16T07:25',
				'2024-02-17T07:24',
				'2024-02-18T07:23',
				'2024-02-19T07:21',
				'2024-02-20T07:20',
				'2024-02-21T07:18',
				'2024-02-22T07:17'
			],
			sunset: [
				'2024-02-16T18:01',
				'2024-02-17T18:02',
				'2024-02-18T18:04',
				'2024-02-19T18:05',
				'2024-02-20T18:06',
				'2024-02-21T18:08',
				'2024-02-22T18:09'
			]
		}
	}
};

type ApiResponseTypeWaterLevel = {
	metadata: {
		id: string;
		name: string;
		lat: string;
		lon: string;
	};
	data: {
		t: string;
		v: string;
		s: string;
		f: string;
		q: string;
	}[];
};

export const apiResponsesWaterLevel: { [id: string]: ApiResponseTypeWaterLevel } = {
	'9075080': {
		metadata: {
			id: '9075080',
			name: 'Mackinaw City',
			lat: '45.7772',
			lon: '-84.7211'
		},
		data: [
			{
				t: '2024-02-15 13:48',
				v: '1.253',
				s: '0.007',
				f: '0,0,0,0',
				q: 'p'
			},
			{
				t: '2024-02-15 13:54',
				v: '1.217',
				s: '0.010',
				f: '0,0,0,0',
				q: 'p'
			}
		]
	},
	'9014087': {
		metadata: {
			id: '9014087',
			name: 'Dry Dock',
			lat: '42.9453',
			lon: '-82.4433'
		},
		data: [
			{
				t: '2024-02-15 13:42',
				v: '1.893',
				s: '0.010',
				f: '0,0,0,0',
				q: 'p'
			},
			{
				t: '2024-02-15 13:48',
				v: '1.900',
				s: '0.003',
				f: '0,0,0,0',
				q: 'p'
			}
		]
	}
};

type ApiResponseTypeAQI = {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: 'GMT';
	timezone_abbreviation: 'GMT';
	elevation: number;
	current_units: {
		time: 'iso8601';
		interval: 'seconds';
		us_aqi: 'USAQI';
	};
	current: {
		time: string;
		interval: number;
		us_aqi: number;
	};
};

export const apiResponsesAQI: { [id: string]: ApiResponseTypeAQI } = {
	'9075080': {
		latitude: 45.600006,
		longitude: -84.799995,
		generationtime_ms: 0.11599063873291016,
		utc_offset_seconds: 0,
		timezone: 'GMT',
		timezone_abbreviation: 'GMT',
		elevation: 177.0,
		current_units: {
			time: 'iso8601',
			interval: 'seconds',
			us_aqi: 'USAQI'
		},
		current: {
			time: '2024-02-16T18:00',
			interval: 3600,
			us_aqi: 12
		}
	},
	'9014087': {
		latitude: 42.800003,
		longitude: -82.4,
		generationtime_ms: 0.1308917999267578,
		utc_offset_seconds: 0,
		timezone: 'GMT',
		timezone_abbreviation: 'GMT',
		elevation: 180.0,
		current_units: {
			time: 'iso8601',
			interval: 'seconds',
			us_aqi: 'USAQI'
		},
		current: {
			time: '2024-02-16T18:00',
			interval: 3600,
			us_aqi: 11
		}
	}
};

export const expectedStationData = {
	'9075080': {
		id: '9075080',
		state: 'MI',
		name: 'Mackinaw City',
		latLong: mockRetrieveLocationDataArgs.locMetadata['9075080'].coords,
		now: {
			airTemperature: apiResponsesOpenMeteoAtmos['9075080'].current.temperature_2m,
			airTemperatureApparent: apiResponsesOpenMeteoAtmos['9075080'].current.apparent_temperature,
			cloudiness: apiResponsesOpenMeteoAtmos['9075080'].current.cloudcover,
			wind: {
				baseSpeed: apiResponsesOpenMeteoAtmos['9075080'].current.windspeed_10m,
				gustSpeed: apiResponsesOpenMeteoAtmos['9075080'].current.windgusts_10m,
				direction: {
					degrees: apiResponsesOpenMeteoAtmos['9075080'].current.winddirection_10m,
					cardinal: degToCard(apiResponsesOpenMeteoAtmos['9075080'].current.winddirection_10m)
				}
			},
			isDay: apiResponsesOpenMeteoAtmos['9075080'].current.is_day === 1,
			weatherCode: '3',
			tideHistory: apiResponsesWaterLevel['9075080'].data,
			visibility: apiResponsesOpenMeteoAtmos['9075080'].current.visibility,
			airQuality: apiResponsesAQI['9075080'].current.us_aqi
		},
		todaySunrise: apiResponsesOpenMeteoAtmos['9075080'].daily.sunrise[0],
		todaySunset: apiResponsesOpenMeteoAtmos['9075080'].daily.sunset[0]
	},
	'9014087': {
		id: '9014087',
		state: 'MI',
		name: 'Dry Dock',
		latLong: mockRetrieveLocationDataArgs.locMetadata['9014087'].coords,
		now: {
			airTemperature: apiResponsesOpenMeteoAtmos['9014087'].current.temperature_2m,
			airTemperatureApparent: apiResponsesOpenMeteoAtmos['9014087'].current.apparent_temperature,
			cloudiness: apiResponsesOpenMeteoAtmos['9014087'].current.cloudcover,
			wind: {
				baseSpeed: apiResponsesOpenMeteoAtmos['9014087'].current.windspeed_10m,
				gustSpeed: apiResponsesOpenMeteoAtmos['9014087'].current.windgusts_10m,
				direction: {
					degrees: apiResponsesOpenMeteoAtmos['9014087'].current.winddirection_10m,
					cardinal: degToCard(apiResponsesOpenMeteoAtmos['9014087'].current.winddirection_10m)
				}
			},
			isDay: apiResponsesOpenMeteoAtmos['9014087'].current.is_day === 1,
			weatherCode: '3',
			tideHistory: apiResponsesWaterLevel['9014087'].data,
			visibility: apiResponsesOpenMeteoAtmos['9014087'].current.visibility,
			airQuality: apiResponsesAQI['9014087'].current.us_aqi
		},
		todaySunrise: apiResponsesOpenMeteoAtmos['9014087'].daily.sunrise[0],
		todaySunset: apiResponsesOpenMeteoAtmos['9014087'].daily.sunset[0]
	}
};

export const expectedStationDataAlt = {
	'9014087': {
		id: '9014087',
		state: 'MI',
		name: 'Dry Dock',
		latLong: mockRetrieveLocationDataArgs.locMetadata['9014087'].coords,
		now: {
			airTemperature: apiResponseOpenMeteoAtmosAlt['9014087'].current.temperature_2m,
			airTemperatureApparent: apiResponseOpenMeteoAtmosAlt['9014087'].current.apparent_temperature,
			cloudiness: apiResponseOpenMeteoAtmosAlt['9014087'].current.cloudcover,
			wind: {
				baseSpeed: apiResponseOpenMeteoAtmosAlt['9014087'].current.windspeed_10m,
				gustSpeed: apiResponseOpenMeteoAtmosAlt['9014087'].current.windgusts_10m,
				direction: {
					degrees: apiResponseOpenMeteoAtmosAlt['9014087'].current.winddirection_10m,
					cardinal: degToCard(apiResponseOpenMeteoAtmosAlt['9014087'].current.winddirection_10m)
				}
			},
			isDay: apiResponseOpenMeteoAtmosAlt['9014087'].current.is_day === 1,
			weatherCode: '3',
			tideHistory: apiResponsesWaterLevel['9014087'].data,
			visibility: apiResponseOpenMeteoAtmosAlt['9014087'].current.visibility,
			airQuality: apiResponsesAQI['9014087'].current.us_aqi
		},
		todaySunrise: apiResponseOpenMeteoAtmosAlt['9014087'].daily.sunrise[0],
		todaySunset: apiResponseOpenMeteoAtmosAlt['9014087'].daily.sunset[0]
	}
};
