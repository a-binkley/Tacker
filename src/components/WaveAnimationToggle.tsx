import { useDispatch, useSelector } from 'react-redux';

import { setWaveAnimation } from '../app/stationData';
import { RootState } from '../pages';

import './WaveAnimationToggle.css';

export function WaveAnimationToggle() {
	const waveAnimation = useSelector<RootState, boolean>((state) => state.waveAnimation);
	const dispatch = useDispatch();

	return (
		<div className='wave-animation-toggle-wrapper unselectable'>
			<label className='wave-animation-toggle-label'>Wave Animation: </label>
			<label className='switch'>
				<input type='checkbox' defaultChecked={waveAnimation} onClick={() => dispatch(setWaveAnimation(!waveAnimation))} />
				<span className='slider round' />
			</label>
		</div>
	);
}
