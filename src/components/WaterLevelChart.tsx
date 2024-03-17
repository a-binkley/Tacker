import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';

import { TideData, TideDataFormatted, calculateAvgForInterval } from '../functions';

import './WaterLevelChart.css';
import { useSelector } from 'react-redux';
import { GeneralUnitType } from '../app/stationData';
import { RootState } from '../pages';

export type LevelsChartProps = { data: TideData[]; isDay: boolean };

export function WaterLevelChart(props: LevelsChartProps) {
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);
	const cleanedData = calculateAvgForInterval(props.data);

	const primaryAxis = useMemo(
		(): AxisOptions<TideDataFormatted> => ({
			getValue: (datum) => datum.t
		}),
		[]
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<TideDataFormatted>[] => [
			{
				getValue: (datum) => datum.v * (generalUnitType === 'english' ? 1 : 0.3048), // convert to meters if needed
				elementType: 'line'
			}
		],
		[generalUnitType]
	);

	const data = useMemo(
		() => [
			{
				label: `Water Level (${generalUnitType === 'english' ? 'feet' : 'meters'} above LWD)`,
				data: cleanedData
			}
		],
		[generalUnitType]
	);

	return (
		<div className={`water-level-chart-wrapper floating-window water-chart-${props.isDay ? 'day' : 'night'}`}>
			<Chart
				className='water-level-chart unselectable'
				options={{
					data,
					primaryAxis,
					secondaryAxes
				}}
			/>
		</div>
	);
}
