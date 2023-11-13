import { degToCard } from './Direction';

describe('degToCard function', () => {
	it('should throw an error if given invalid input', () => {
		expect(() => degToCard(-1)).toThrowError(`Direction provided (-1 degrees) is invalid`);
		expect(() => degToCard(360)).toThrowError(`Direction provided (360 degrees) is invalid`);
	});

	it('should correctly map degrees 358.75-11.25 to "N"', () => {
		for (let i = 358.75; i < 371.25; i += 0.5) {
			expect(degToCard(i % 360)).toBe('N');
		}
	});

	it('should correctly map degrees 191.25-213.75 to "SSW"', () => {
		for (let i = 191.25; i < 213.75; i += 0.5) {
			expect(degToCard(i % 360)).toBe('SSW');
		}
	});

	it('should correctly map 90 degrees to "E"', () => {
		expect(degToCard(90)).toBe('E');
	});
});
