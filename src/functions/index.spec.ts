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
			'8311030': {
				city: 'Ogdensburg',
				state: 'NY',
				coords: {
					lat: 44.697944,
					lng: -75.497722
				}
			}
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
	it('should return proper data for provided stations', async () => {});

	it('should return proper data if given incomplete metadata', async () => {});

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
		expect(consoleSpy).toHaveBeenCalledWith(`Could not retrieve station data. ${rejection}`);
	});
});
