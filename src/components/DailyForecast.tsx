import { useSelector } from 'react-redux';

import { GeneralUnitType, WindspeedUnitType } from '../app/stationData';
import wmoCodes from '../app/wmoCodes.json';
import { convertWindSpeed, DailyForecast, fahrenheitToCelcius } from '../functions';
import { RootState } from '../pages';

import './DailyForecast.css';

function formatForecastDatumTemps(data: DailyForecast): string {
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);

	if (generalUnitType === 'english') {
		return `${Math.round(data.temperature_2m_max)} / ${Math.round(data.temperature_2m_min)} °F`;
	} else {
		return `${Math.round(fahrenheitToCelcius(data.temperature_2m_max))} / ${Math.round(
			fahrenheitToCelcius(data.temperature_2m_min)
		)} °C`;
	}
}

function precipitationIconByWeatherCode({ weather_code }: DailyForecast): JSX.Element {
	const weatherCodes = wmoCodes as { [key: string]: { description: string; image: string } };

	if (Object.keys(weatherCodes).includes(`${weather_code}`)) {
		return <img className='daily-forecast-datum-wmo-icon' src={weatherCodes[weather_code].image} />;
	} else {
		console.error(`Invalid WMO code provided for forecast: ${weather_code}`);
		return <img className='daily-forecast-datum-wmo-icon' alt='??' />;
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
						{precipitationIconByWeatherCode(forecastDatum)}
						<p className='daily-forecast-datum-precipitation-chance'>{`${forecastDatum.precipitation_probability_max}%`}</p>
					</div>
					<div className='daily-forecast-datum-wind-data-wrapper'>
						<div className='daily-forecast-datum-wind-direction'>
							<div
								className='daily-forecast-wind-arrow-wrapper'
								style={{
									transform: `rotate(${forecastDatum.winddirection_10m_dominant}deg)`
								}}
							>
								<i className='bi bi-arrow-up daily-forecast-wind-arrow' />
							</div>
						</div>
						<p className='daily-forecast-datum-wind-speed-number'>{`${Math.round(
							convertWindSpeed(forecastDatum.windspeed_10m_max, windspeedUnitType)
						)}`}</p>
					</div>
					<p className='daily-forecast-datum-wind-speed-unit'>{windspeedUnitType}</p>
				</div>
			))}
		</div>
	);
}
