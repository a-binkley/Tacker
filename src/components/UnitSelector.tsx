import { useDispatch } from 'react-redux';
import { GeneralUnitType, WindspeedUnitType, setGeneralUnitType, setWindspeedUnitType } from '../app/stationData';

export function UnitSelector(props: { category: 'general' | 'windspeed' }) {
	const dispatch = useDispatch();
	const optionsByCategory = {
		general: ['english', 'metric'],
		windspeed: ['mph', 'km/h', 'm/s', 'kn']
	};

	const handleUnitTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const unitType = event.currentTarget.value;
		if (props.category === 'general') {
			if (['english', 'metric'].includes(unitType)) {
				dispatch(setGeneralUnitType(unitType as GeneralUnitType));
			} else {
				console.error(`Invalid general unit type selected: "${unitType}"`);
			}
		} else {
			if (['mph', 'km/h', 'm/s', 'kn'].includes(unitType)) {
				dispatch(setWindspeedUnitType(unitType as WindspeedUnitType));
			} else {
				console.error(`Invalid windspeed unit type selected: "${unitType}"`);
			}
		}
	};

	return (
		<div className='unit-selector-wrapper'>
			<select className='unit-type-selector ${}' onChange={handleUnitTypeChange}>
				{optionsByCategory[props.category].map((opt) => (
					<option key={`selector-option-${props.category}-${opt}`}>{opt}</option>
				))}
			</select>
		</div>
	);
}
