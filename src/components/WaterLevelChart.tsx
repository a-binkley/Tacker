import moment from 'moment';
import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';

export type TideData = {
	t: string; // datetime of record
	v: string; // feet/meters above low water datum
};

type TideDataFormatted = { t: string; v: number; count: number };
type WaterLevelProps = { data: TideData[]; interval: 30 | 60; unit: 'feet' | 'meters' };
const indexOffsets = {
	30: [-1, -2, 2, 1],
	60: [-1, -2, -3, -4, 5, 4, 3, 2, 1]
};

/**
 * Aggregates water level data from the NOAA API into smoother, less detailed results.
 * Due to limitations with [react-charts](https://github.com/TanStack/react-charts) and
 * the interval parameter in NOAA's API, data and label manipulations must be done here.
 * @param args the props passed into this {@link WaterLevelChart} component
 * @returns the formatted and averaged water level data to display
 */
export function calculateAvgForInterval(args: WaterLevelProps): TideDataFormatted[] {
	const formattedData: TideDataFormatted[] = args.data.map<TideDataFormatted>((datum) => {
		return { t: datum.t, v: parseFloat(datum.v), count: 1 };
	});
	formattedData.forEach((datum, index) => {
		if (!isNaN(datum.v)) {
			const minutesFromInterval = parseInt(datum.t.substring(14)) % args.interval;
			if (minutesFromInterval !== 0 && minutesFromInterval % 6 === 0) {
				const indexOffset = indexOffsets[args.interval][minutesFromInterval / 6 - 1];
				if (
					(indexOffset < 0 && index > Math.abs(indexOffset) - 1) ||
					(indexOffset > 0 && index < formattedData.length - indexOffset)
				) {
					formattedData[index + indexOffset].v += datum.v;
					formattedData[index + indexOffset].count++;
				}
			}
		}
	});

	const intervalData = formattedData.filter((datum) => {
		return !isNaN(datum.v) && (datum.t.endsWith('00') || (args.interval === 30 && datum.t.endsWith('30')));
	});

	intervalData.forEach((datum, index) => {
		const shouldLabelDate = datum.t.endsWith('00:00') || index === 0 || index === intervalData.length - 1;
		datum.t = moment(datum.t).format(`${shouldLabelDate ? 'MMM DD, ' : ''}h:mm a`);
		datum.v /= datum.count;
	});
	return intervalData;
}

export function WaterLevelChart(props: WaterLevelProps) {
	const cleanedData = calculateAvgForInterval(props);

	const primaryAxis = useMemo(
		(): AxisOptions<TideDataFormatted> => ({
			getValue: (datum) => datum.t
		}),
		[]
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<TideDataFormatted>[] => [
			{
				getValue: (datum) => datum.v,
				elementType: 'line'
			}
		],
		[]
	);

	const data = useMemo(
		() => [
			{
				label: `Water Level (${props.unit} above LWD)`,
				data: cleanedData
			}
		],
		[]
	);

	return (
		<Chart
			options={{
				data,
				primaryAxis,
				secondaryAxes
			}}
		/>
	);
}
