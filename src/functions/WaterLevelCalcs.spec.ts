import { calculateAvgForInterval, TideData } from '.';

const mockData: { [key: string]: TideData[] } = {
	aggUp: [
		{
			t: '2024-03-16 15:48',
			v: '1.124'
		},
		{
			t: '2024-03-16 15:54',
			v: '1.132'
		},
		{
			t: '2024-03-16 16:00',
			v: '1.158'
		}
	],
	aggDown: [
		{
			t: '2024-03-16 17:00',
			v: ''
		},
		{
			t: '2024-03-16 17:06',
			v: ''
		},
		{
			t: '2024-03-16 17:12',
			v: '0.109'
		},
		{
			t: '2024-03-16 17:18',
			v: '0.109'
		},
		{
			t: '2024-03-16 17:24',
			v: '0.112'
		}
	],
	NaN: [
		{
			t: '2024-03-16 15:48',
			v: ''
		},
		{
			t: '2024-03-16 15:54',
			v: ''
		},
		{
			t: '2024-03-16 16:00',
			v: ''
		}
	],
	threeHour: [
		{
			t: '2024-03-16 16:54',
			v: ''
		},
		{
			t: '2024-03-16 17:00',
			v: ''
		},
		{
			t: '2024-03-16 17:06',
			v: ''
		},
		{
			t: '2024-03-16 17:12',
			v: '0.108'
		},
		{
			t: '2024-03-16 17:18',
			v: '0.108'
		},
		{
			t: '2024-03-16 17:24',
			v: '0.112'
		},
		{
			t: '2024-03-16 17:30',
			v: '0.115'
		},
		{
			t: '2024-03-16 17:36',
			v: '0.115'
		},
		{
			t: '2024-03-16 17:42',
			v: '0.118'
		},
		{
			t: '2024-03-16 17:48',
			v: '0.118'
		},
		{
			t: '2024-03-16 17:54',
			v: '0.118'
		},
		{
			t: '2024-03-16 18:00',
			v: '0.118'
		},
		{
			t: '2024-03-16 18:06',
			v: '0.121'
		},
		{
			t: '2024-03-16 18:12',
			v: '0.121'
		},
		{
			t: '2024-03-16 18:18',
			v: '0.121'
		},
		{
			t: '2024-03-16 18:24',
			v: '0.125'
		},
		{
			t: '2024-03-16 18:30',
			v: '0.125'
		},
		{
			t: '2024-03-16 18:36',
			v: '0.128'
		},
		{
			t: '2024-03-16 18:42',
			v: '0.128'
		},
		{
			t: '2024-03-16 18:48',
			v: ''
		},
		{
			t: '2024-03-16 18:54',
			v: ''
		},
		{
			t: '2024-03-16 19:00',
			v: '0.128'
		},
		{
			t: '2024-03-16 19:06',
			v: '0.128'
		},
		{
			t: '2024-03-16 19:12',
			v: '0.131'
		}
	]
};

describe('calculateAvgForInterval function', () => {
	it('should return an empty array if no values are present', () => {
		expect(calculateAvgForInterval(mockData.NaN)).toStrictEqual([]);
	});

	it('should aggregate by the hour', () => {
		expect(calculateAvgForInterval(mockData.aggUp)).toStrictEqual([
			{
				t: 'Mar 16, 4:00 pm',
				v: 1.138,
				count: 3
			}
		]);

		expect(calculateAvgForInterval(mockData.aggDown)).toStrictEqual([
			{
				t: 'Mar 16, 5:00 pm',
				v: 0.11,
				count: 3
			}
		]);

		expect(calculateAvgForInterval(mockData.threeHour)).toStrictEqual([
			{
				t: 'Mar 16, 5:00 pm',
				v: 0.109,
				count: 3
			},
			{
				t: '6:00 pm',
				v: 0.119,
				count: 10
			},
			{
				t: 'Mar 16, 7:00 pm',
				v: 0.128,
				count: 6
			}
		]);
	});
});
