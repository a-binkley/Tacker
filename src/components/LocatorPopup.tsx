import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { StationInfo } from '../functions';
import { CSSProperties } from 'react';

export function LocatorPopup(props: {
	stations: StationInfo[];
	favorites: string[];
	handleFavoriteChange: (station: StationInfo, existingFavorite: boolean) => void;
	setSearchMode: (state: 'prompt' | 'search' | 'display') => void;
}) {
	const isFavorite = (favorites: string[], stationID: string) => favorites.some((station) => station === stationID);

	const mapStyle: CSSProperties = {
			height: 'calc(100vh - 80px)',
			width: 'calc(100vw - 80px)',
			top: '40px',
			left: '40px',
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
			display: props.favorites.length === 0 ? 'none' : '',
		};

	return (
		<div className="locator-popup-wrapper">
			<i className="bi bi-x-square" style={closeBtnStyle} onClick={() => props.setSearchMode('display')}></i>
			<MapContainer
				center={[45.4, -84.4]} // Approximately center to all five lakes
				zoom={7}
				style={mapStyle}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{props.stations.map((station) => (
					<Marker position={station.latLong} key={`station-${station.id}`}>
						<Popup>
							{isFavorite(props.favorites, station.id) ? (
								<i
									className="bi bi-star-fill"
									style={{ fontSize: '1rem', color: 'goldenrod' }}
									onClick={() => props.handleFavoriteChange(station, true)}
								/>
							) : (
								<i
									className="bi bi-star"
									style={{ fontSize: '1rem', color: 'black' }}
									onClick={() => props.handleFavoriteChange(station, false)}
								/>
							)}
							{` ${station.name}, ${station.state}`} <br />
							{`${station.latLong.lat.toFixed(4)},${station.latLong.lng.toFixed(4)}`}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
