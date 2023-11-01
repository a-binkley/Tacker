import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { Locator } from '../components';
import { latLongDegreesToDecimal } from '../functions';

export function Home() {
	return (
		<>
			{/* <Locator value="" /> */}
			<MapContainer
				center={[45.4, -84.4]} // Approximately center to all five lakes
				zoom={7}
				// scrollWheelZoom={false}
				style={{ height: '90vh', width: '90vw' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker
					position={latLongDegreesToDecimal({
						latitudeDMS: {
							degrees: 45,
							minutes: 58.2,
							direction: 'N',
						},
						longitudeDMS: {
							degrees: 85,
							minutes: 52.3,
							direction: 'W',
						},
					})}
				>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</>
	);
}
