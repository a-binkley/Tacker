import { GeneralUnitType } from '../../app/stationData';

import './VisibilityDisplay.css';

/**
 * Presentational component which displays the current atmospheric visibility for a location
 * @param props.data the visibility distance
 * @param props.units the {@link GeneralUnitType} to use for display
 */
export function VisibilityDisplay(props: { data: number; units: GeneralUnitType }) {
	const visibilityDenom = props.units === 'english' ? 5280 : 1000;
	const visibilityUnit = props.units === 'english' ? 'miles' : 'km';

	return (
		<div className='visibility-wrapper floating-window unselectable'>
			<p className='visibility-label'>Visibility</p>
			<h4 className='visibility-data'>{(props.data / visibilityDenom).toFixed(1)}</h4>
			<p className='visibility-units'>{visibilityUnit}</p>
		</div>
	);
}
