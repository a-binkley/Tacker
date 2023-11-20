import './AirQualityDisplay.css';

export function AirQualityDisplay(props: { data: number }) {
	const descriptions = [
		'good', // 0-50
		'moderate', // 50-100
		'unhealthy for sensitive groups', // 100-150
		'unhealthy', // 150-200
		'very unhealthy', // 200-300
		'very unhealthy',
		'hazardous', // 300-500
		'hazardous',
		'hazardous',
		'hazardous'
	];

	return (
		<div className='air-quality-wrapper'>
			<img className='air-quality-meter' src={process.env.PUBLIC_URL + '/img/AQIMeter.png'} alt='aqi meter' />
			<img
				className='air-quality-needle'
				src={process.env.PUBLIC_URL + '/img/AQINeedle.png'}
				alt='aqi needle'
				style={{
					rotate: `${(props.data / 500) * 180 - 90}deg`
				}}
			/>
			<h4 className='air-quality-number'>{props.data}</h4>
			<p className='air-quality-description'>{descriptions[Math.floor(props.data / 50)]}</p>
		</div>
	);
}
