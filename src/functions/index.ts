import axios from 'axios';
import { LatLng, LatLngExpression } from 'leaflet';

export type StationInfo = {
	id: string;
	state: string;
	name: string; // city
	latLong: LatLng;
};

export async function retrieveCurrentStations(
	setter: Function
): Promise<StationInfo[]> {
	axios({
		method: 'GET',
		url: 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json',
	})
		.then((response) => {
			if (response.status == 200) {
				const greatLakesStations = response.data.stations.filter(
					(station: { [key: string]: string }) => station.greatlakes
				);
				setter(
					greatLakesStations.map(
						(
							station: StationInfo & { lat: number; lng: number }
						) => ({
							id: station.id,
							state: station.state,
							name: station.name,
							latLong: new LatLng(station.lat, station.lng),
						})
					)
				);
			} else
				throw new Error(
					`Could not retrieve station data. Response received with code ${response.status}`
				);
		})
		.catch((err) => {
			console.error(err);
			throw err; // STUB
		});
	return [];
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
export function latLongDegreesToDecimal(loc: {
	latitudeDMS: LocationDMS;
	longitudeDMS: LocationDMS;
}): LatLngExpression {
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
