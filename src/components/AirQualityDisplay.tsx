import './AirQualityDisplay.css';

/**
 * Find correct angle for aqi needle based on aqi value, with slight adjustments for display accuracy
 * @param aqi the aqi value provided by a weather API
 * @returns the angle, in degrees, of the aqi needle image rotation
 */
export function getNeedleAngle(aqi: number): number {
	if (aqi < 0 || aqi > 999) throw new Error(`Provided AQI (${aqi}) is invalid`);
	else if (aqi < 200) {
		return aqi * 0.6 - 90;
	} else if (aqi < 300) {
		return aqi * 0.3 - 28;
	} else {
		return Math.min(aqi * 0.15 + 17, 90);
	}
}

export function AirQualityDisplay(props: { data: number }) {
	const descriptions = [
		'Good', // 0-49
		'Moderate', // 50-99
		'Unhealthy for sensitive groups', // 100-149
		'Unhealthy', // 150-199
		'Very unhealthy', // 200-299
		'Very unhealthy',
		'Hazardous' // 300+
	];

	return (
		<div className='air-quality-wrapper'>
			<h4 className='air-quality-label'>Air Quality (U.S. AQI)</h4>
			<img className='air-quality-meter' src={process.env.PUBLIC_URL + '/img/AQIMeter.png'} alt='aqi meter' />
			<img
				className='air-quality-needle'
				src={process.env.PUBLIC_URL + '/img/AQINeedlePoint.png'}
				alt='aqi needle'
				style={{
					rotate: `${getNeedleAngle(props.data)}deg`
				}}
			/>
			<h4 className='air-quality-number' style={{ fontSize: props.data < 100 ? '4rem' : '3rem' }}>
				{props.data}
			</h4>
			<p className='air-quality-description'>{descriptions[Math.min(Math.floor(props.data / 50), 6)]}</p>
		</div>
	);
}
