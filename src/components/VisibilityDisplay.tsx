import { GeneralUnitType } from '../app/stationData';

import './VisibilityDisplay.css';

export function VisibilityDisplay(props: { data: number; units: GeneralUnitType }) {
	const visibilityDenom = props.units === 'english' ? 5280 : 1000;
	const visibilityUnit = props.units === 'english' ? 'miles' : 'km';

	return (
		<div className='visibility-wrapper floating-window'>
			<div className='visibility-label-wrapper'>
				<i className='bi bi-eye' />
				<p className='visibility-label unselectable'>Visibility</p>
			</div>
			<h4 className='visibility-data unselectable'>{(props.data / visibilityDenom).toFixed(1)}</h4>
			<p className='visibility-units unselectable'>{visibilityUnit}</p>
		</div>
	);
}
