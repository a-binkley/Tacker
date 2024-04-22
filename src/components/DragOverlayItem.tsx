import { forwardRef } from 'react';

const DragOverlayItem = forwardRef<HTMLDivElement, { id: string | number }>(({ id, ...props }, ref) => {
	return (
		<div {...props} ref={ref} style={{ visibility: 'hidden' }}>
			{id}
		</div>
	);
});

DragOverlayItem.displayName = 'DragOverlayItem';

export { DragOverlayItem };
