import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';

import { TideDataFormatted, WaterLevelProps, calculateAvgForInterval } from '../functions';

import './WaterLevelChart.css';

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
				label: `Water Level (${props.unit === 'english' ? 'feet' : 'meters'} above LWD)`,
				data: cleanedData
			}
		],
		[]
	);

	return (
		<div className='water-level-chart-wrapper'>
			<Chart
				className='water-level-chart'
				options={{
					data,
					primaryAxis,
					secondaryAxes
				}}
			/>
		</div>
	);
}
