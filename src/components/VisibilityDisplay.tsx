import './VisibilityDisplay.css';

export function VisibilityDisplay(props: { data: number; units: 'imperial' | 'metric' }) {
	const visibilityDenom = props.units === 'imperial' ? 5280 : 1000;
	const visibilityUnit = props.units === 'imperial' ? 'miles' : 'km';

	return (
		<div className='visibility-wrapper'>
			<div className='visibility-label-wrapper'>
				<i className='bi bi-eye' />
				<p className='visibility-label'>Visibility</p>
			</div>
			<h4 className='visibility-data'>{(props.data / visibilityDenom).toFixed(1)}</h4>
			<p className='visibility-units'>{visibilityUnit}</p>
		</div>
	);
}
