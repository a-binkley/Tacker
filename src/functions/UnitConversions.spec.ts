import { fahrenheitToCelcius, mphToKnots, mphToKph, mphToMetersPerSec } from '.';

describe('fahrenheit to celcius conversion', () => {
	it('32°F should equal 0°C', () => {
		expect(fahrenheitToCelcius(32)).toBe(0);
	});

	it('70°F should equal 21.1°C', () => {
		expect(parseFloat(fahrenheitToCelcius(70).toFixed(1))).toBe(21.1);
	});
});

describe('mph to knots conversion', () => {
	it('1 mph should equal 0.9 knots', () => {
		expect(parseFloat(mphToKnots(1).toFixed(1))).toBe(0.9);
	});

	it('25 mph should equal 21.7 knots', () => {
		expect(parseFloat(mphToKnots(25).toFixed(1))).toBe(21.7);
	});
});

describe('mph to kph conversion', () => {
	it('30 mph should equal 48.3 kph', () => {
		expect(parseFloat(mphToKph(30).toFixed(1))).toBe(48.3);
	});

	it('100 mph should equal 160.9', () => {
		expect(parseFloat(mphToKph(100).toFixed(1))).toBe(160.9);
	});
});

describe('mph to m/s conversion', () => {
	it('1 mph should equal 0.45 m/s', () => {
		expect(parseFloat(mphToMetersPerSec(1).toFixed(2))).toBe(0.45);
	});

	it('20 mph should equal 8.94 m/s', () => {
		expect(parseFloat(mphToMetersPerSec(20).toFixed(2))).toBe(8.94);
	});
});
