import { imageForWeatherCode, precipitationIconByWeatherCode } from '../../functions';

import './CurrWeatherDisplay.css';

/**
 * Presentational component which displays the current weather description and icon
 * according to the input WMO code
 * @param props.data the WMO code to use for weather icon/description lookup
 * @param props.isDay whether to display the daytime or nighttime version of the icon
 */
export function CurrWeatherDisplay(props: { data: number; isDay: boolean }) {
	const wmoInfo = precipitationIconByWeatherCode(props.data, props.isDay);
	const image = imageForWeatherCode(wmoInfo);
	return (
		<div className='curr-weather-display-wrapper unselectable floating-window'>
			<div className='curr-weather-icon-wrapper'>{image}</div>
			<p className='curr-weather-description'>{wmoInfo?.description}</p>
		</div>
	);
}
