import { CSSProperties } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { MetadataSerializableType } from '../app/stationData';
import { RootState } from '../pages';

export function LocatorPopup(props: {
	handleFavoriteChange: (station: string) => void;
	setSearchMode: (state: 'prompt' | 'search' | 'display') => void;
}) {
	const favoritesIDs: string[] = useSelector<RootState, any>((state) => state.favoritesIDs);
	const metadataStore: MetadataSerializableType = useSelector<RootState, any>((state) => state.metadata);
	const isFavorite = (id: string) => favoritesIDs.includes(id);

	const mapStyle: CSSProperties = {
			height: 'calc(100vh - 80px)',
			width: 'calc(100vw - 80px)',
			top: '40px',
			left: '40px'
		},
		closeBtnStyle: CSSProperties = {
			position: 'absolute',
			height: '32px',
			width: '32px',
			top: '43px',
			right: '50px',
			fontSize: '2rem',
			zIndex: 500,
			cursor: 'pointer',
			display: favoritesIDs.length === 0 ? 'none' : ''
		};

	return (
		<div className='locator-popup-wrapper'>
			<i className='bi bi-x-square' style={closeBtnStyle} onClick={() => props.setSearchMode('display')}></i>
			<MapContainer
				center={[45.4, -84.4]} // Approximately center to all five lakes
				zoom={7}
				style={mapStyle}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{Object.entries(metadataStore).map(([id, metadata]) => (
					// TODO: color markers according to isFavorite(id) for easier visual distinction
					<Marker position={metadata.coords} key={`station-${id}`}>
						<Popup>
							<i
								className={`bi bi-star${isFavorite(id) ? '-fill' : ''}`}
								style={{ fontSize: '1rem', color: `${isFavorite(id) ? 'goldenrod' : 'black'}` }}
								onClick={() => props.handleFavoriteChange(id)}
							/>
							{` ${metadata.city}, ${metadata.state}`} <br />
							{`${metadata.coords.lat.toFixed(4)},${metadata.coords.lng.toFixed(4)}`}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
