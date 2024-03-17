import L from 'leaflet';
import { CSSProperties } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';

import { MetadataSerializableType, setSearchMode, setFavorites, updateViewingIndex } from '../app/stationData';
import { RootState } from '../pages';

function getLeafletIcon(isFavorite: boolean): L.Icon {
	return new L.Icon({
		iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${
			isFavorite ? 'blue' : 'grey'
		}.png`,
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});
}

export function LocatorPopup() {
	const favoritesIDs = useSelector<RootState, string[]>((state) => state.favoritesIDs);
	const viewingIndex = useSelector<RootState, number>((state) => state.viewingIndex);
	const metadataStore = useSelector<RootState, MetadataSerializableType>((state) => state.metadata);
	const dispatch = useDispatch();

	const handleFavoriteChange = (stationID: string) => {
		if (favoritesIDs.includes(stationID)) {
			dispatch(setFavorites(favoritesIDs.filter((id: string) => id !== stationID))); // Remove
			dispatch(updateViewingIndex(Math.min(viewingIndex, favoritesIDs.length - 1)));
		} else {
			dispatch(setFavorites(favoritesIDs.concat([stationID]))); // Add
		}
	};

	const mapStyle: CSSProperties = {
			height: '100vh',
			width: '100vw'
		},
		continueBtnStyle: CSSProperties = {
			position: 'absolute',
			borderRadius: '10px',
			bottom: '20px',
			left: 'calc(50% - 2.5em)',
			height: 'max-content',
			width: '5em',
			fontSize: '1.4em',
			zIndex: 500,
			cursor: 'pointer',
			display: favoritesIDs.length === 0 ? 'none' : ''
		};

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<button style={continueBtnStyle} onClick={() => dispatch(setSearchMode('display'))}>
				Done
			</button>
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
					<Marker
						position={metadata.coords}
						icon={getLeafletIcon(favoritesIDs.includes(id))}
						eventHandlers={{
							mouseover: (event) => event.target.openPopup(),
							mouseout: (event) => event.target.closePopup(),
							click: () => handleFavoriteChange(id)
						}}
						key={`station-${id}`}
					>
						<Popup>
							{`${metadata.city}, ${metadata.state}`} <br />
							{`${metadata.coords.lat.toFixed(4)},${metadata.coords.lng.toFixed(4)}`}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
