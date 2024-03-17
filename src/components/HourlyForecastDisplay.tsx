import { useSelector } from 'react-redux';

import { GeneralUnitType, WindspeedUnitType } from '../app/stationData';
import { HourlyForecast, convertWindSpeed, precipitationIconByWeatherCode } from '../functions';
import { RootState } from '../pages';

import './HourlyForecastDisplay.css';

export function HourlyForecastDisplay(props: { data: HourlyForecast[] }) {
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);
	const windspeedUnitType = useSelector<RootState, WindspeedUnitType>((state) => state.windspeedUnit);

	const tempUnit = generalUnitType === 'english' ? '°F' : '°C';

	return (
		<div className='hourly-forecast-wrapper floating-window'>
			{props.data.map((forecastDatum) => (
				<div className='hourly-forecast-datum-wrapper' key={`hourly-forecast-datum-${forecastDatum.time}`}>
					<p className='hourly-forecast-datum-label'>{forecastDatum.time}</p>
					<p className='hourly-forecast-datum-temp'>{`${Math.round(forecastDatum.temp)} ${tempUnit}`}</p>
					<div className='hourly-forecast-datum-weather-icon-wrapper'>
						{precipitationIconByWeatherCode(forecastDatum.weatherCode, forecastDatum.isDay)}
					</div>
					<div className='hourly-forecast-datum-wind-data-wrapper'>
						<div className='hourly-forecast-datum-wind-direction'>
							<div
								className='hourly-forecast-wind-arrow-wrapper'
								style={{
									transform: `rotate(${forecastDatum.wind.direction}deg)`
								}}
							>
								<i className='bi bi-arrow-up hourly-forecast-wind-arrow' />
							</div>
						</div>
						<p className='hourly-forecast-datum-wind-speed-number'>{`${Math.round(
							convertWindSpeed(forecastDatum.wind.speed, windspeedUnitType)
						)}`}</p>
					</div>
					<p className='hourly-forecast-datum-wind-speed-unit'>{windspeedUnitType}</p>
				</div>
			))}
		</div>
	);
}
