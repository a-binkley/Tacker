import { useDispatch, useSelector } from 'react-redux';

import {
	AirQualityDisplay,
	CurrWeatherDisplay,
	DailyForecastDisplay,
	HourlyForecastDisplay,
	MeatballNav,
	PageTab,
	SunriseSunsetDisplay,
	TemperatureDisplay,
	UnitSelector,
	VisibilityDisplay,
	WaterLevelChart,
	WindRing
} from '.';
import { GeneralUnitType, setSearchMode, updateViewingIndex } from '../app/stationData';
import { StationInfo } from '../functions';
import { RootState } from '../pages';

import './LocationInfoCard.css';

/**
 * A pure, presentational component containing everything displayed for a given station's data.
 * Style changes based on day/night status, wind speed, and cloudiness. Tracks `favoritesIDs`
 * and `viewingIndex` from the Redux store for page-to-page navigation
 * @param props.id the station id to be used as a basis for the page's data
 * @param props.data the station data and metadata for the given id
 */
export function LocationInfoCard(props: { id: string; data: StationInfo }) {
	const favoritesIDs = useSelector<RootState, string[]>((state) => state.favoritesIDs);
	const viewingIndex = useSelector<RootState, number>((state) => state.viewingIndex);
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);
	const dispatch = useDispatch();

	return (
		<div
			className='location-info-card-wrapper'
			style={{
				background: props.data.now.isDay
					? `radial-gradient(farthest-side at 25% 0, white, hsl(194, ${
							(57 * (100 - parseInt(props.data.now.cloudiness))) / 100 // base color saturation on cloudiness
					  }%, 67%))`
					: 'linear-gradient(#01040a, #101c36)',
				color: props.data.now.isDay ? 'black' : '#fff7ea'
			}}
		>
			<div
				className='wave-background'
				// base animation speed on wind speed
				style={{
					animation: `wave ${30 / props.data.now.wind.baseSpeed}s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite`,
					opacity: props.data.now.isDay ? '' : '30%'
				}}
			/>
			<i className='bi bi-map' onClick={() => dispatch(setSearchMode('search'))} />
			<h2 className='city-state-header unselectable'>{`${props.data.name}, ${props.data.state}`}</h2>
			<h3 className='lat-long-header unselectable'>{`${props.data.latLong.lat.toFixed(3)},${props.data.latLong.lng.toFixed(
				3
			)}`}</h3>
			<div className='selector-area-wrapper'>
				<UnitSelector category='general' />
				<UnitSelector category='windspeed' />
			</div>
			<div className='location-info-body-wrapper'>
				<div className='current-conditions-wrapper'>
					<div className='all-temp-wrapper'>
						<SunriseSunsetDisplay data={{ sunrise: props.data.todaySunrise, sunset: props.data.todaySunset }} />
						<div className='air-temp-info-wrapper floating-window'>
							<TemperatureDisplay
								type='air-actual'
								label='Air Temp (actual)'
								data={props.data.now.airTemperature}
								units={generalUnitType}
							/>
							<div className='air-temp-separator' />
							<TemperatureDisplay
								type='air-apparent'
								label='Air Temp (feel)'
								data={props.data.now.airTemperatureApparent}
								units={generalUnitType}
							/>
						</div>
						<div className='weather-temp-row-wrapper'>
							<CurrWeatherDisplay data={props.data.now.weatherCode} />
							<TemperatureDisplay
								type='water floating-window'
								label='Water Temp'
								data={props.data.now.waterTemperature}
								units={generalUnitType}
							/>
						</div>
					</div>
					<WindRing {...props.data.now.wind} />
					<div className='air-particle-data-wrapper'>
						<AirQualityDisplay data={props.data.now.airQuality} />
						<VisibilityDisplay data={Math.round(props.data.now.visibility)} units={generalUnitType} />
					</div>
				</div>
				<div className='predicted-conditions-wrapper'>
					<div className='predicted-weather-wrapper'>
						<HourlyForecastDisplay data={props.data.forecastHourly} />
						<DailyForecastDisplay data={props.data.forecastDaily} />
					</div>
					<WaterLevelChart data={props.data.now.tideHistory} interval={60} isDay={props.data.now.isDay} />
				</div>
			</div>
			<PageTab direction='left' display={viewingIndex !== 0} onClick={() => dispatch(updateViewingIndex(-1))} />
			<PageTab
				direction='right'
				display={viewingIndex !== favoritesIDs.length - 1}
				onClick={() => dispatch(updateViewingIndex(1))}
			/>
			<MeatballNav />
		</div>
	);
}
