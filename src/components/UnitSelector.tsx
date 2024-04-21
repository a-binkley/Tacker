import { useDispatch, useSelector } from 'react-redux';

import { GeneralUnitType, WindspeedUnitType, setGeneralUnitType, setWindspeedUnitType } from '../app/stationData';
import { RootState } from '../pages';

import './UnitSelector.css';

/**
 * Dropdown selector for setting the user's preferred unit of measurement. Connects to the Redux store
 * and affects the rendering of numerous other components
 * @param props.category whether this selector is for general (temperature and distance) units or wind speed units
 */
export function UnitSelector(props: { category: 'general' | 'windspeed' }) {
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);
	const windspeedUnitType = useSelector<RootState, WindspeedUnitType>((state) => state.windspeedUnit);
	const dispatch = useDispatch();

	const categoryInfo = {
		general: {
			label: 'General units: ',
			options: ['english', 'metric'],
			selected: generalUnitType
		},
		windspeed: {
			label: 'Wind speed units: ',
			options: ['mph', 'km/h', 'm/s', 'kn'],
			selected: windspeedUnitType
		}
	};

	const handleUnitTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const unitType = event.currentTarget.value;
		if (props.category === 'general') {
			dispatch(setGeneralUnitType(unitType as GeneralUnitType));
		} else {
			dispatch(setWindspeedUnitType(unitType as WindspeedUnitType));
		}
	};

	return (
		<div className='unit-selector-wrapper unselectable'>
			<label className='unit-selector-label'>{categoryInfo[props.category].label}</label>
			<select
				className={`unit-type-selector ${props.category}`}
				defaultValue={categoryInfo[props.category].selected}
				onChange={handleUnitTypeChange}
			>
				{categoryInfo[props.category].options.map((opt) => (
					<option key={`selector-option-${props.category}-${opt}`}>{opt}</option>
				))}
			</select>
		</div>
	);
}
