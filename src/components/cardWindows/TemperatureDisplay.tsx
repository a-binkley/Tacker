import { GeneralUnitType } from '../../app/stationData';
import { fahrenheitToCelcius } from '../../functions';

import './TemperatureDisplay.css';

export function TemperatureDisplay(props: { label: string; data?: number; units: GeneralUnitType }) {
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
