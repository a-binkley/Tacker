import './TemperatureDisplay.css';

export function TemperatureDisplay(props: { type: string; label: string; data: number; units: 'F' | 'C' }) {
	return (
		<div className={`temp-display-wrapper ${props.type}`}>
			<p className='temp-label'>{props.label}</p>
			<h4 className='temp-data'>{Math.round(props.data)}</h4>
			<p className='temp-units'>{`°${props.units}`}</p>
		</div>
	);
}
