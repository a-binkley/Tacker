import { GeneralUnitType } from '../../app/stationData';
import { fahrenheitToCelcius } from '../../functions';

import './TemperatureDisplay.css';

/**
 * Presentational component which displays the temperature for a location. Can be used for air or water temperatures,
 * as well as actual or apparent (RealFeel) temperatures.
 * @param props.label whether this display is for an actual or an apparent temperature
 * @param props.data the temperature to display, or undefined if missing data
 * @param props.units whether to display the temperature in Fahrenheit or Celcius
 */
export function TemperatureDisplay(props: { label: 'Actual' | 'Feels Like'; data?: number; units: GeneralUnitType }) {
	let tempData = '--',
		tempUnits = '';
	if (props.data !== undefined) {
		if (props.units === 'english') {
			tempData = `${Math.round(props.data)}`;
			tempUnits = '°F';
		} else {
			tempData = `${Math.round(fahrenheitToCelcius(props.data))}`;
			tempUnits = '°C';
		}
	}

	return (
		<div className='temp-display-wrapper unselectable'>
			<p className='temp-label'>{props.label}</p>
			<div className='temp-amount-wrapper'>
				<h4 className='temp-data'>{tempData}</h4>
				<p className='temp-units'>{tempUnits}</p>
			</div>
		</div>
	);
}
