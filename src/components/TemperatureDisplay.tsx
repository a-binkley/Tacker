import './TemperatureDisplay.css';

export function TemperatureDisplay(props: { type: string; label: string; data?: number; units: 'F' | 'C' }) {
	const hasData = props.data !== undefined;

	return (
		<div className={`temp-display-wrapper ${props.type}`}>
			<p className='temp-label unselectable'>{props.label}</p>
			<h4 className='temp-data unselectable'>{hasData ? Math.round(props.data!) : '--'}</h4>
			<p className='temp-units unselectable'>{hasData ? `°${props.units}` : ''}</p>
		</div>
	);
}
