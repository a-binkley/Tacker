import './CurrWeatherDisplay.css';

export function CurrWeatherDisplay(props: { data: string }) {
	return (
		<div className='curr-weather-display-wrapper floating-window'>
			<p>{props.data}</p>
		</div>
	);
}
