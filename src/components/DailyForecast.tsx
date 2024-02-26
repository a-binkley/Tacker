import { useSelector } from 'react-redux';

import { GeneralUnitType, WindspeedUnitType } from '../app/stationData';
import { convertWindSpeed, DailyForecast, fahrenheitToCelcius, precipitationIconByWeatherCode } from '../functions';
import { RootState } from '../pages';

import './DailyForecast.css';

function formatForecastDatumTemps(data: DailyForecast): string {
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);

	if (generalUnitType === 'english') {
		return `${Math.round(data.maxTemp)} / ${Math.round(data.minTemp)} °F`;
	} else {
		return `${Math.round(fahrenheitToCelcius(data.maxTemp))} / ${Math.round(fahrenheitToCelcius(data.minTemp))} °C`;
	}
}

export function DailyForecastDisplay(props: { data: DailyForecast[] }) {
	const windspeedUnitType = useSelector<RootState, WindspeedUnitType>((state) => state.windspeedUnit);

	return (
		<div className='daily-forecast-wrapper'>
			{props.data.map((forecastDatum, index) => (
				<div className='daily-forecast-datum-wrapper' key={`daily-forecast-datum-${forecastDatum.date}`}>
					<p className='daily-forecast-datum-label'>{index === 0 ? 'Today' : forecastDatum.date}</p>
					<p className='daily-forecast-datum-temps'>{formatForecastDatumTemps(forecastDatum)}</p>
					<div className='daily-forecast-datum-precipitation-wrapper'>
						{precipitationIconByWeatherCode(forecastDatum.weatherCode, true)}
						<p className='daily-forecast-datum-precipitation-chance'>{`${forecastDatum.precipitationChance}%`}</p>
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
					</div>
					<p className='daily-forecast-datum-wind-speed-unit'>{windspeedUnitType}</p>
				</div>
			))}
		</div>
	);
}
