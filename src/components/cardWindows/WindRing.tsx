import { useSelector } from 'react-redux';

import { WindspeedUnitType } from '../../app/stationData';
import { convertWindSpeed, WindInfo } from '../../functions';
import { RootState } from '../../pages';

import './WindRing.css';

/**
 * Presentational component which displays the current wind speed and direction using a compass ring.
 * @param props the {@link WindInfo} to use for rendering
 */
export function WindRing(props: WindInfo) {
	const windspeedUnitType = useSelector<RootState, WindspeedUnitType>((state) => state.windspeedUnit);

	return (
		<div className='wind-info-wrapper floating-window unselectable'>
			<img className='compass-ring' src={process.env.PUBLIC_URL + '/img/CompassRing.png'} alt='ring' />
			{['N', 'E', 'S', 'W'].map((direction) => (
				<p className={`compass-direction compass-${direction}`} key={`compass-label-${direction}`}>
					{direction}
				</p>
			))}
			<img
				className='wind-arrow'
				src={process.env.PUBLIC_URL + '/img/CompassArrowHollow.png'}
				alt='arrow'
				style={{ rotate: `${(props.direction.degrees + 180) % 360}deg` }}
			/>
			<div className='wind-speed-inner-ring'>
				<h4 className='wind-speed-data'>{Math.round(convertWindSpeed(props.baseSpeed, windspeedUnitType))}</h4>
				<p className='wind-speed-units'>{windspeedUnitType}</p>
			</div>
		</div>
	);
}
