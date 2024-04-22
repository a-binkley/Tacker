import moment from 'moment';

import './SunriseSunsetDisplay.css';

/**
 * Presentational component which displays the sunrise and sunset time for a location
 * @param props.data.sunrise the sunrise time for this location
 * @param props.data.sunset the sunset time for this location
 */
export function SunriseSunsetDisplay(props: { data: { sunrise: string; sunset: string } }) {
	return (
		<div className='sunrise-sunset-wrapper floating-window unselectable'>
			<div className='sun-data-wrapper'>
				<i className='bi bi-sunrise-fill' />
				<p className='sunrise-time'>{moment(props.data.sunrise, 'hh:mm').format('h:mm a')}</p>
			</div>
			<div className='sunrise-sunset-separator' />
			<div className='sun-data-wrapper'>
				<i className='bi bi-sunset' />
				<p className='sunset-time'>{moment(props.data.sunset, 'hh:mm').format('h:mm a')}</p>
			</div>
		</div>
	);
}
