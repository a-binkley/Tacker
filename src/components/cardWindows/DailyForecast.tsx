import { useSelector } from 'react-redux';

import { GeneralUnitType, WindspeedUnitType } from '../../app/stationData';
import {
	convertWindSpeed,
	DailyForecast,
	fahrenheitToCelcius,
	imageForWeatherCode,
	precipitationIconByWeatherCode
} from '../../functions';
import { RootState } from '../../pages';

import './DailyForecast.css';

/**
 * Calculate, format, and return the max and min temperature for a given day, according to the user's
 * preference of unit type (english vs metric)
 * @param data a {@link DailyForecast} object containing information of the daily max and min temperatures
 * @returns a string showing the max and min temperatures for the day in the preferred unit of measurement
 */
function formatForecastDatumTemps(data: DailyForecast): string {
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);

	if (generalUnitType === 'english') {
		return `${Math.round(data.maxTemp)} / ${Math.round(data.minTemp)} °F`;
	} else {
		return `${Math.round(fahrenheitToCelcius(data.maxTemp))} / ${Math.round(fahrenheitToCelcius(data.minTemp))} °C`;
	}
}

/**
 * Presentational component which displays daily forecast data for upcoming days at a location
 * @param props.data an array of {@link DailyForecast} objects to use for rendering various information
 */
export function DailyForecastDisplay(props: { data: DailyForecast[] }) {
	const windspeedUnitType = useSelector<RootState, WindspeedUnitType>((state) => state.windspeedUnit);

	return (
		<div className='daily-forecast-wrapper unselectable floating-window'>
			{props.data.map((forecastDatum, index) => (
				<div className='daily-forecast-datum-wrapper' key={`daily-forecast-datum-${forecastDatum.date}`}>
					<div className='daily-forecast-datum-day-temp-wrapper'>
						<p className='daily-forecast-datum-label'>{index === 0 ? 'Today' : forecastDatum.date}</p>
						<p className='daily-forecast-datum-temps'>{formatForecastDatumTemps(forecastDatum)}</p>
					</div>
					<div className='daily-forecast-datum-precipitation-wrapper'>
						{imageForWeatherCode(precipitationIconByWeatherCode(forecastDatum.weatherCode, true))}
						<p className='daily-forecast-datum-precipitation-chance'>
							{forecastDatum.precipitationChance === 0 ? '' : `${forecastDatum.precipitationChance}%`}
						</p>
					</div>
					<div className='daily-forecast-datum-wind-data-wrapper'>
						<div className='daily-forecast-datum-wind-direction'>
							<div
								className='daily-forecast-wind-arrow-wrapper'
								style={{
									transform: `rotate(${forecastDatum.wind.direction}deg)`
								}}
							>
								<i className='bi bi-arrow-up daily-forecast-wind-arrow' />
							</div>
						</div>
						<p className='daily-forecast-datum-wind-speed-number'>{`${Math.round(
							convertWindSpeed(forecastDatum.wind.speed, windspeedUnitType)
						)}`}</p>
						<p className='daily-forecast-datum-wind-speed-unit'>{windspeedUnitType}</p>
					</div>
				</div>
			))}
		</div>
	);
}
