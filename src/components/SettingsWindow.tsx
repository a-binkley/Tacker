import {
	DndContext,
	closestCenter,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragStartEvent,
	DragEndEvent
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DragOverlayItem, SortableFavorite, UnitSelector, WaveAnimationToggle } from '.';
import { setFavorites, setSettingsIsOpen, updateViewingIndex } from '../app/stationData';
import { RootState } from '../pages';

import './SettingsWindow.css';

export function SettingsWindow() {
	const [activeId, setActiveId] = useState<string | number | null>(null);
	const favoritesIDs = useSelector<RootState, string[]>((state) => state.favoritesIDs);
	const viewingIndex = useSelector<RootState, number>((state) => state.viewingIndex);
	const settingsIsOpen = useSelector<RootState, boolean>((state) => state.settingsIsOpen);
	const dispatch = useDispatch();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	const handleDragStart = function (event: DragStartEvent) {
		const { active } = event;
		setActiveId(active.id);
	};

	const handleDragEnd = function (event: DragEndEvent) {
		const { active, over } = event;

		if (over !== null && active.id !== over.id) {
			const oldIndex = favoritesIDs.indexOf(active.id as string);
			const newIndex = favoritesIDs.indexOf(over.id as string);

			// Update Redux store, but keep viewing the same location when done
			const currLocation = favoritesIDs[viewingIndex];
			const reordered = arrayMove(favoritesIDs, oldIndex, newIndex);
			dispatch(setFavorites(reordered));
			dispatch(updateViewingIndex(reordered.indexOf(currLocation) - viewingIndex));
		}

		setActiveId(null);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={(event) => handleDragEnd(event)}
		>
			<div className='settings-backdrop-grey' style={{ display: settingsIsOpen ? '' : 'none' }}>
				<div className='settings-container'>
					<i className='bi bi-x-circle settings-close-btn' onClick={() => dispatch(setSettingsIsOpen(false))} />
					<div className='settings-core-wrapper'>
						<ol className='settings-favorites-reorder-wrapper'>
							<SortableContext items={favoritesIDs} strategy={verticalListSortingStrategy}>
								{favoritesIDs.map((stationID) => (
									<SortableFavorite key={`settings-reorder-${stationID}`} id={stationID} />
								))}
							</SortableContext>
							<DragOverlay>{activeId ? <DragOverlayItem id={activeId} /> : null}</DragOverlay>
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
