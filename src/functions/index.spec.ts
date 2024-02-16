import axios from 'axios';

import { retrieveCurrentStations, retrieveLocationData } from '.';
import {
	apiResponseNOAA,
	apiResponseOpenMeteoAtmosAlt,
	apiResponsesAQI,
	apiResponsesOpenMeteoAtmos,
	apiResponsesWaterLevel,
	apiResponsesWaterTemp,
	expectedStationData,
	expectedStationDataAlt,
	mockRetrieveLocationDataArgs,
	rejection
} from './testConstants';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => '');

beforeEach(() => {
	jest.clearAllMocks();
	consoleSpy.mockReset();
});

describe('retrieveCurrentStations function', () => {
	it('should return proper metadata for Great Lakes stations', async () => {
		mockedAxios.mockResolvedValueOnce({ status: 200, data: apiResponseNOAA });
		const stations = await retrieveCurrentStations();

		expect(mockedAxios).toHaveBeenCalledTimes(1);
		expect(stations).toStrictEqual({
			'9075080': mockRetrieveLocationDataArgs.locMetadata['9075080'],
			'9014087': mockRetrieveLocationDataArgs.locMetadata['9014087']
		});
	});

	it('should gracefully handle request errors', async () => {
		mockedAxios.mockRejectedValueOnce(rejection);
		const stations = await retrieveCurrentStations();

		expect(stations).toStrictEqual({});
		expect(consoleSpy).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledWith(`Could not retrieve station metadata. ${rejection}`);
	});
});

describe('retrieveLocationData function', () => {
	it('should return proper data for provided stations', async () => {
		for (const locID of mockRetrieveLocationDataArgs.locs.slice(2)) {
			for (const responseType of [
				apiResponsesOpenMeteoAtmos,
				apiResponsesWaterLevel,
				apiResponsesWaterTemp,
				apiResponsesAQI
			]) {
				mockedAxios.mockResolvedValueOnce({ status: 200, data: responseType[locID] });
			}
		}

		const data = await retrieveLocationData(
			mockRetrieveLocationDataArgs.locs.slice(2),
			mockRetrieveLocationDataArgs.locMetadata,
			'fahrenheit',
			'mph',
			'inch'
		);

		expect(data).toStrictEqual(expectedStationData);
	});

	it('should return proper data if given incomplete metadata', async () => {
		const testStationID = '9075080';
		for (const responseType of [apiResponsesOpenMeteoAtmos, apiResponsesWaterLevel, apiResponsesWaterTemp, apiResponsesAQI]) {
			mockedAxios.mockResolvedValueOnce({ status: 200, data: responseType[testStationID] });
		}

		const data = await retrieveLocationData(
			['9075080'],
			{ '9075080': mockRetrieveLocationDataArgs.locMetadata['9075080'] },
			'fahrenheit',
			'mph',
			'inch'
		);

		expect(data).toStrictEqual({ '9075080': expectedStationData['9075080'] });
	});

	it('should return proper data with alternate measurement units', async () => {
		const testStationID = '9014087';
		for (const responseType of [apiResponseOpenMeteoAtmosAlt, apiResponsesWaterLevel, apiResponsesWaterTemp, apiResponsesAQI]) {
			mockedAxios.mockResolvedValueOnce({ status: 200, data: responseType[testStationID] });
		}

		const data = await retrieveLocationData(
			['9014087'],
			{ '9014087': mockRetrieveLocationDataArgs.locMetadata['9014087'] },
			'celcius',
			'km/h',
			'mm'
		);

		expect(data).toStrictEqual(expectedStationDataAlt);
	});

	it('should gracefully handle request errors', async () => {
		mockedAxios.mockRejectedValueOnce(rejection);
		const data = await retrieveLocationData(
			mockRetrieveLocationDataArgs.locs,
			mockRetrieveLocationDataArgs.locMetadata,
			'fahrenheit',
			'mph',
			'inch'
		);

		expect(data).toStrictEqual({});
		expect(consoleSpy).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledWith(
			`Could not retrieve station ${Object.keys(mockRetrieveLocationDataArgs.locMetadata)[0]} data. ${rejection}`
		);
	});
});
