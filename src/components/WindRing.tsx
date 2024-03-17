import { useSelector } from 'react-redux';
import { WindspeedUnitType } from '../app/stationData';
import { convertWindSpeed, WindInfo } from '../functions';
import { RootState } from '../pages';

import './WindRing.css';

export function WindRing(props: WindInfo) {
	const windspeedUnitType = useSelector<RootState, WindspeedUnitType>((state) => state.windspeedUnit);

	return (
		<div className='wind-info-wrapper floating-window'>
			<img className='compass-ring' src={process.env.PUBLIC_URL + '/img/CompassRing.png'} alt='ring' />
			{['N', 'E', 'S', 'W'].map((direction) => (
				<p className={`compass-direction compass-${direction} unselectable`} key={`compass-label-${direction}`}>
					{direction}
				</p>
			))}
			<img
				className='wind-arrow'
				src={process.env.PUBLIC_URL + '/img/CompassArrowHollow.png'}
				alt='arrow'
				style={{ rotate: `${(props.direction.degrees + 180) % 360}deg` }}
			/>
			<h4 className='wind-speed-header unselectable'>{Math.round(convertWindSpeed(props.baseSpeed, windspeedUnitType))}</h4>
			<p className='wind-speed-units unselectable'>{windspeedUnitType}</p>
		</div>
	);
}
