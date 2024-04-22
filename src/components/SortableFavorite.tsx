import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSelector } from 'react-redux';

import { MetadataSerializableType } from '../app/stationData';
import { RootState } from '../pages';

/**
 * Drag-and-drop reorderable favorite station to display in a list in the settings menu
 * @param props.id the id of this station
 */
export function SortableFavorite(props: { id: string }) {
	const metadata = useSelector<RootState, MetadataSerializableType>((state) => state.metadata);

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	return (
		<li ref={setNodeRef} style={style} {...attributes} {...listeners} className='settings-reorder'>
			<i className='bi bi-grip-vertical settings-reorder-grip' />
			<p className='settings-reorder-label'>{`${metadata[props.id].city}, ${metadata[props.id].state}`}</p>
		</li>
	);
}
