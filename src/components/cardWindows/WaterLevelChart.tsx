import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { useSelector } from 'react-redux';

import { GeneralUnitType } from '../../app/stationData';
import { TideData, TideDataFormatted, calculateAvgForInterval } from '../../functions';
import { RootState } from '../../pages';

import './WaterLevelChart.css';

/**
 * Presentational component which displays the past water level above/below Low Water Datum (LWD)
 * for a location. This can be used to see where a location's tide is within the tide cycle
 * @param props.data the array of {@link TideData} to use for chart population
 * @param props.isDay whether the background of this display is over a daytime or nighttime page.
 * Used for color visibility enhancement
 */
export function WaterLevelChart(props: { data: TideData[]; isDay: boolean }) {
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);
	const cleanedData = calculateAvgForInterval(props.data);
	const chartLabel = `Water Level (${generalUnitType === 'english' ? 'feet' : 'meters'} above LWD)`;

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
				label: chartLabel,
				data: cleanedData
			}
		],
		[generalUnitType]
	);

	return (
		<div className={`water-level-chart-wrapper floating-window unselectable water-chart-${props.isDay ? 'day' : 'night'}`}>
			<p className='water-level-chart-label'>{chartLabel}</p>
			<div className='water-level-data-wrapper'>
				<Chart
					className='water-level-chart'
					options={{
						data,
						primaryAxis,
						secondaryAxes
					}}
				/>
			</div>
		</div>
	);
}
