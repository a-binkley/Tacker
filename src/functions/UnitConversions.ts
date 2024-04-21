export function fahrenheitToCelcius(temp: number): number {
	return ((temp - 32) * 5) / 9;
}

export function mphToKph(value: number): number {
	return value * 1.609344;
}

export function mphToMetersPerSec(value: number): number {
	return value * 0.44704;
}

export function mphToKnots(value: number): number {
	return value * 0.868976;
}
