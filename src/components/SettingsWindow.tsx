import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSelector, useDispatch } from 'react-redux';

import { SortableFavorite, UnitSelector, WaveAnimationToggle } from '.';
import { setFavorites, setSettingsIsOpen } from '../app/stationData';
import { RootState } from '../pages';

import './SettingsWindow.css';

export function SettingsWindow() {
	const favoritesIDs = useSelector<RootState, string[]>((state) => state.favoritesIDs);
	const settingsIsOpen = useSelector<RootState, boolean>((state) => state.settingsIsOpen);
	const dispatch = useDispatch();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	const handleDragEnd = function (event: DragEndEvent) {
		const { active, over } = event;

		if (over !== null && active.id !== over.id) {
			const oldIndex = favoritesIDs.indexOf(active.id as string);
			const newIndex = favoritesIDs.indexOf(over.id as string);

			dispatch(setFavorites(arrayMove(favoritesIDs, oldIndex, newIndex)));
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => handleDragEnd(event)}>
			<div className={`settings-backdrop-grey ${settingsIsOpen ? 'settings-fg' : 'settings-bg'}`}>
				<div className='settings-container'>
					<i className='bi bi-x-circle settings-close-btn' onClick={() => dispatch(setSettingsIsOpen(false))} />
					<div className='settings-core-wrapper'>
						<ol className='settings-favorites-reorder-wrapper'>
							<SortableContext items={favoritesIDs} strategy={verticalListSortingStrategy}>
								{favoritesIDs.map((stationID) => (
									<SortableFavorite key={`settings-reorder-${stationID}`} id={stationID} />
								))}
							</SortableContext>
						</ol>
						<div className='selector-area-wrapper'>
							<UnitSelector category='general' />
							<UnitSelector category='windspeed' />
							<WaveAnimationToggle />
						</div>
					</div>
				</div>
			</div>
		</DndContext>
	);
}
