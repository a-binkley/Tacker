import moment from 'moment';

import './SunriseSunsetDisplay.css';

export function SunriseSunsetDisplay(props: { data: { sunrise: string; sunset: string } }) {
	return (
		<div className='sunrise-sunset-wrapper'>
			<div className='sun-data-wrapper'>
				<i className='bi bi-sunrise-fill'></i>
				<p className='sunrise-time'>{moment(props.data.sunrise, 'hh:mm').format('h:mm a')}</p>
			</div>
			<div className='sunrise-sunset-separator' />
			<div className='sun-data-wrapper'>
				<i className='bi bi-sunset'></i>
				<p className='sunset-time'>{moment(props.data.sunset, 'hh:mm').format('h:mm a')}</p>
			</div>
		</div>
	);
}
