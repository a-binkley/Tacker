import { MouseEventHandler, useState } from 'react';

/**
 * Simple arrow icons at the left and right sides of desktop screens which allow the user to navigate among pages
 * for favorited stations
 * @param props.direction whether the arrow points left or right
 * @param props.display whether or not to show the arrow
 * @param props.onClick a {@link MouseEventHandler} which changes viewing page
 */
export function PageTab(props: { direction: 'left' | 'right'; display: boolean; onClick: MouseEventHandler<HTMLElement> }) {
	const [hovered, setHovered] = useState(false);

	return (
		<i
			className={`bi bi-caret-${props.direction}${hovered ? '-fill' : ''} tab-arrow`}
			style={{ display: props.display ? '' : 'none' }}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={props.onClick}
		/>
	);
}
