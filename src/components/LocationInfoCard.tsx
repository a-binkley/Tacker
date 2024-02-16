import { useDispatch } from 'react-redux';

import { AirQualityDisplay, PageTab, TemperatureDisplay, VisibilityDisplay, WindRing } from '.';
import { updateViewingIndex } from '../app/stationData';
import { StationInfo } from '../functions';

import './LocationInfoCard.css';

export function LocationInfoCard(props: { id: string; data: StationInfo; position: number; neighbors: string[] }) {
	const dispatch = useDispatch();

	return (
		<div
			className='location-info-card-wrapper'
			// TODO: add 'url(../../public/img/NightStars.svg)' for stars
			style={{
				background: props.data.now.isDay
					? `radial-gradient(farthest-side at 25% 0, white, hsl(194, ${
							(57 * (100 - parseInt(props.data.now.cloudiness))) / 100 // base color saturation on cloudiness
					  }%, 67%))`
					: 'linear-gradient(#040d21, #102144)',
				color: props.data.now.isDay ? 'black' : '#fffd'
			}}
		>
			{/* base animation speed on wind */}
			<div
				className='wave-background'
				style={{ animation: `wave ${30 / props.data.now.wind.baseSpeed}s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite` }}
			/>
			<h2 className='city-state-header unselectable'>{`${props.data.name}, ${props.data.state}`}</h2>
			<h3 className='lat-long-header unselectable'>{`${props.data.latLong.lat.toFixed(3)},${props.data.latLong.lng.toFixed(
				3
			)}`}</h3>
			<div className='location-info-body-wrapper'>
				<div className='all-temp-wrapper'>
					<div className='air-temp-info-wrapper'>
						<TemperatureDisplay
							type='air-actual'
							label='Air Temp (actual)'
							data={props.data.now.airTemperature}
							units='F'
						/>
						<div className='air-temp-separator' />
						<TemperatureDisplay
							type='air-apparent'
							label='Air Temp (feel)'
							data={props.data.now.airTemperatureApparent}
							units='F'
						/>
					</div>
					<TemperatureDisplay type='water' label='Water Temp' data={props.data.now.waterTemperature} units='F' />
				</div>
				<WindRing {...props.data.now.wind} />
				<VisibilityDisplay data={Math.round(props.data.now.visibility)} units='imperial' />
				<AirQualityDisplay data={props.data.now.airQuality} />
			</div>
			<PageTab direction='left' display={props.position !== 0} onClick={() => dispatch(updateViewingIndex(-1))} />
			<PageTab
				direction='right'
				display={props.position !== props.neighbors.length - 1}
				onClick={() => dispatch(updateViewingIndex(1))}
			/>
		</div>
	);
}
