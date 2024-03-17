import moment from 'moment';

// timestamps from :30 to :54 gets rounded up to the nearest hour, everything else rounded down
const indexOffsets = [-1, -2, -3, -4, 5, 4, 3, 2, 1];

export type TideData = {
	t: string; // datetime of record
	v: string; // feet/meters above low water datum
};

export type TideDataFormatted = { t: string; v: number; count: number };

/**
 * Aggregates water level data from the NOAA API into smoother, less detailed results.
 * Due to limitations with [react-charts](https://github.com/TanStack/react-charts) and
 * the interval parameter in NOAA's API, data and label manipulations must be done here.
 * @param args the props passed into this {@link WaterLevelChart} component
 * @returns the formatted and averaged water level data to display
 */
export function calculateAvgForInterval(data: TideData[]): TideDataFormatted[] {
	const formattedData: TideDataFormatted[] = data.map<TideDataFormatted>((datum) => {
		if (datum.v === '') {
			return { t: datum.t, v: 0, count: 0 };
		} else {
			return { t: datum.t, v: parseFloat(datum.v), count: 1 };
		}
	});

	formattedData.forEach((datum, index) => {
		const minutesFromTopOfHour = parseInt(datum.t.substring(14));
		// Only include actual data
		if (datum.count > 0 && minutesFromTopOfHour !== 0) {
			const indexOffset = indexOffsets[minutesFromTopOfHour / 6 - 1]; // [-4,5]
			// Only aggregate to hour markers within range
			if (
				(indexOffset < 0 && index >= Math.abs(indexOffset)) ||
				(indexOffset > 0 && index < formattedData.length - indexOffset)
			) {
				formattedData[index + indexOffset].v += datum.v;
				formattedData[index + indexOffset].count++;
			}
		}
	});

	const intervalData = formattedData.filter((datum) => datum.count > 0 && datum.t.endsWith('00'));

	intervalData.forEach((datum, index) => {
		const shouldLabelDate = datum.t.endsWith('00:00') || index === 0 || index === intervalData.length - 1;
		datum.t = moment(datum.t).format(`${shouldLabelDate ? 'MMM DD, ' : ''}h:mm a`);
		datum.v = parseFloat((datum.v / datum.count).toFixed(3));
	});

	return intervalData;
}
