import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { retrieveCurrentStations, StationInfo } from '../functions';

export function Home() {
	const [stations, setStations] = useState<StationInfo[]>([]);

	useEffect(() => {
		if (stations.length === 0) {
			retrieveCurrentStations(setStations);
		}
	});

	return (
		<>
			{/* <Locator value="" /> */}
			<MapContainer
				center={[45.4, -84.4]} // Approximately center to all five lakes
				zoom={7}
				style={{ height: '90vh', width: '90vw' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{stations.map((station) => (
					<Marker
						position={station.latLong}
						key={`station-${station.id}`}
					>
						<Popup>
							{`${station.name}, ${station.state}`} <br />
							{`${station.latLong.lat.toFixed(
								4
							)},${station.latLong.lng.toFixed(4)}`}
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</>
	);
}
