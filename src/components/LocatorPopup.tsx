import L from 'leaflet';
import { CSSProperties } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';

import { MetadataSerializableType, setSearchMode, setFavorites, updateViewingIndex, setHasNewData } from '../app/stationData';
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
	const hasNewData = useSelector<RootState, boolean>((state) => state.hasNewData);
	const favoritesIDs = useSelector<RootState, string[]>((state) => state.favoritesIDs);
	const viewingIndex = useSelector<RootState, number>((state) => state.viewingIndex);
	const metadataStore = useSelector<RootState, MetadataSerializableType>((state) => state.metadata);
	const dispatch = useDispatch();

	const handleFavoriteChange = (stationID: string) => {
		if (favoritesIDs.includes(stationID)) {
			let newViewingIndex = 0;
			if (viewingIndex > 0 && viewingIndex >= favoritesIDs.indexOf(stationID)) newViewingIndex = -1;
			dispatch(updateViewingIndex(newViewingIndex));
			dispatch(setFavorites(favoritesIDs.filter((id: string) => id !== stationID))); // Remove
		} else {
			dispatch(setFavorites(favoritesIDs.concat([stationID]))); // Add
			if (!hasNewData) dispatch(setHasNewData(true));
		}
	};

	const mapStyle: CSSProperties = {
			height: '100vh',
			width: '100vw'
		},
		popupBtnContainerStyle: CSSProperties = {
			position: 'absolute',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: '20px',
			height: 'max-content',
			width: '40vw',
			bottom: '20px',
			left: 'calc(50% - 20vw)',
			zIndex: 500
		},
		popupBtnStyle: CSSProperties = {
			position: 'relative',
			border: '2px solid',
			borderRadius: '10px',
			padding: '5px 8px',
			fontSize: '1.4em',
			cursor: 'pointer',
			display: favoritesIDs.length === 0 ? 'none' : ''
		};

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<div className='popup-btn-container' style={popupBtnContainerStyle}>
				<button
					style={popupBtnStyle}
					onClick={() => {
						dispatch(setFavorites([]));
						dispatch(updateViewingIndex(viewingIndex * -1)); // zero out
					}}
				>
					Clear All
				</button>
				<button style={popupBtnStyle} onClick={() => dispatch(setSearchMode('display'))}>
					Done
				</button>
			</div>
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
