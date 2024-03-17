import axios from 'axios';

import { retrieveCurrentStations, retrieveLocationData } from '.';
import { apiResponseNOAA, mockRetrieveLocationDataArgs, rejection } from './testConstants';

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
	it('should gracefully handle request errors', async () => {
		mockedAxios.mockRejectedValueOnce(rejection);
		const data = await retrieveLocationData({
			locs: mockRetrieveLocationDataArgs.locs,
			locMetadata: mockRetrieveLocationDataArgs.locMetadata
		});

		expect(data).toStrictEqual({});
		expect(consoleSpy).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledWith(
			`Could not retrieve station ${Object.keys(mockRetrieveLocationDataArgs.locMetadata)[0]} data. ${rejection}`
		);
	});
});
