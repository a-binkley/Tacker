import './TemperatureDisplay.css';

export function TemperatureDisplay(props: { type: string; label: string; data?: number; units: 'F' | 'C' }) {
	return (
		<div className={`temp-display-wrapper ${props.type}`}>
			<p className='temp-label unselectable'>{props.label}</p>
			<h4 className='temp-data unselectable'>{props.data !== undefined ? Math.round(props.data) : '--'}</h4>
			<p className='temp-units unselectable'>{props.data !== undefined ? `°${props.units}` : ''}</p>
		</div>
	);
}
