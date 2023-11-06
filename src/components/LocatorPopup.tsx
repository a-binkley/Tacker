import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { StationInfo } from '../functions';
import { CSSProperties } from 'react';

export function LocatorPopup(props: {
	stations: StationInfo[];
	favorites: string[];
	handleFavoriteChange: (station: StationInfo, existingFavorite: boolean) => void;
	setSearchMode: (state: 'prompt' | 'search' | 'display') => void;
}) {
	const closeBtnStyle: CSSProperties = {
		position: 'absolute',
		top: '50px',
		right: '50px',
		zIndex: 500,
		cursor: 'pointer',
		display: props.favorites.length === 0 ? 'none' : '',
	};

	const isFavorite = (favorites: string[], stationID: string) => favorites.some((station) => station === stationID);

	return (
		<div className="locator-popup-wrapper">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				fill="currentColor"
				className="bi bi-x-square"
				viewBox="0 0 16 16"
				style={closeBtnStyle}
				onClick={() => props.setSearchMode('display')}
			>
				<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
				<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
			</svg>
			<MapContainer
				center={[45.4, -84.4]} // Approximately center to all five lakes
				zoom={7}
				style={{
					height: 'calc(100vh - 80px)',
					width: 'calc(100vw - 80px)',
					top: '40px',
					left: '40px',
				}}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{props.stations.map((station) => (
					<Marker position={station.latLong} key={`station-${station.id}`}>
						<Popup>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill={isFavorite(props.favorites, station.id) ? 'goldenrod' : 'black'}
								className={`bi bi-star` + isFavorite(props.favorites, station.id) ? `-fill` : ''}
								viewBox="0 0 16 16"
								onClick={() => props.handleFavoriteChange(station, isFavorite(props.favorites, station.id))}
							>
								{isFavorite(props.favorites, station.id) ? (
									<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
								) : (
									<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
								)}
							</svg>
							{` ${station.name}, ${station.state}`} <br />
							{`${station.latLong.lat.toFixed(4)},${station.latLong.lng.toFixed(4)}`}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
