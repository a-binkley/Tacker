import { MouseEventHandler, useState } from 'react';

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
