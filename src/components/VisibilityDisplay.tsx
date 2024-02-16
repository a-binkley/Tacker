import './VisibilityDisplay.css';

export function VisibilityDisplay(props: { data: number; units: 'imperial' | 'metric' }) {
	if (props.units === 'imperial') {
		// Show in miles
		return (
			<div className='visibility-wrapper'>
				<div className='visibility-label-wrapper'>
					<i className='bi bi-eye' />
					<h2 className='visibility-label'>Visibility</h2>
				</div>
				<h4 className='visibility-data'>{(props.data / 5280).toFixed(1)}</h4>
				<p className='visibility-units'>miles</p>
			</div>
		);
	} else {
		// Show in km
		return (
			<div className='visibility-wrapper'>
				<div className='visibility-label-wrapper'>
					<i className='bi bi-eye' />
					<h2 className='visibility-label'>Visibility</h2>
				</div>
				<h4 className='visibility-data'>{(props.data / 1000).toFixed(1)}</h4>
				<p className='visibility-units'>km</p>
			</div>
		);
	}
}
