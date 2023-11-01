import { LatLng, LatLngExpression } from "leaflet";

export type LocationDMS = {
	degrees: number;
	minutes: number;
	seconds?: number;
	direction: "N" | "E" | "S" | "W";
};

/**
 * Convert latitude/longitude degrees to decimals
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
		if (["S", "W"].includes(resultLoc.direction)) {
			resultLoc.degrees *= -1;
		}
	}

	return new LatLng(resultLat.degrees, resultLong.degrees);
}
