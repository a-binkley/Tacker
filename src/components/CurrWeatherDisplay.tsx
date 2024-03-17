import { imageForWeatherCode, precipitationIconByWeatherCode } from '../functions';

import './CurrWeatherDisplay.css';

export function CurrWeatherDisplay(props: { data: number; isDay: boolean }) {
	const wmoInfo = precipitationIconByWeatherCode(props.data, props.isDay);
	const image = imageForWeatherCode(wmoInfo);
	return (
		<div className='curr-weather-display-wrapper floating-window'>
			<div className='curr-weather-icon-wrapper'>{image}</div>
			<p className='curr-weather-description'>{wmoInfo?.description}</p>
		</div>
	);
}
