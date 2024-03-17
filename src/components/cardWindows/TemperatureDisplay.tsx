import { GeneralUnitType } from '../../app/stationData';
import { fahrenheitToCelcius } from '../../functions';

import './TemperatureDisplay.css';

export function TemperatureDisplay(props: { type: string; label: string; data?: number; units: GeneralUnitType }) {
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
		<div className={`temp-display-wrapper ${props.type}`}>
			<p className='temp-label unselectable'>{props.label}</p>
			<h4 className='temp-data unselectable'>{tempData}</h4>
			<p className='temp-units unselectable'>{tempUnits}</p>
		</div>
	);
}
