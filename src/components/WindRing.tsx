import { WindInfo } from '../functions';

import './WindRing.css';

export function WindRing(props: WindInfo) {
	return (
		<div className='wind-info-wrapper'>
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
			<h4 className='wind-speed-header unselectable'>{Math.round(props.baseSpeed)}</h4>
			<p className='wind-speed-units unselectable'>mph</p>
		</div>
	);
}
