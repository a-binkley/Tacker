import { useEffect, useState } from 'react';

import { fetchStationCoordinates, retrieveCurrentStations, StationInfo } from '../functions';
import { LocationInfoCard, LocatorPopup } from '../components';
import { LatLng } from 'leaflet';

export type StationMetadata = { city: string; state: string; coords: LatLng };

export function Home() {
	const [allStations, setAllStations] = useState<StationInfo[]>([]);
	const [stationMetadata, setStationMetadata] = useState<Map<string, StationMetadata>>(new Map());
	const [displayLocIdx, setDisplayLocIdx] = useState(0);
	const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem('favoriteStations') ?? '[]'));
	const [searchMode, setSearchMode] = useState<'prompt' | 'search' | 'display'>(
		favorites.length === 0 ? 'prompt' : 'display'
	);

	useEffect(() => {
		if (allStations.length === 0) {
			retrieveCurrentStations(setAllStations);
		}
		if (stationMetadata.size === 0) {
			fetchStationCoordinates(setStationMetadata);
		}
		localStorage.setItem('favoriteStations', JSON.stringify(favorites));
	}, [allStations.length, stationMetadata.size, favorites, searchMode]);

	const handleFavoriteChange = (stationInfo: StationInfo, existingFavorite: boolean) => {
		if (existingFavorite) {
			setFavorites(favorites.filter((station) => station !== stationInfo.id)); // Remove
		} else {
			setFavorites(favorites.concat([stationInfo.id])); // Add
		}
	};

	return (
		<div className='home-wrapper'>
			{searchMode === 'prompt' ? (
				// Ask the user to add at least one location as a favorite
				<div className='locator-prompt'>
					<h3>It looks like you don't have any locations marked as favorites yet.</h3>
					<button onClick={() => setSearchMode('search')}>Find a station</button>
				</div>
			) : // TODO: make pretty
			searchMode === 'search' ? (
				// Display the Leaflet map to allow user to add station(s) to favorites
				<LocatorPopup {...{ stations: allStations, favorites, handleFavoriteChange, setSearchMode }} />
			) : stationMetadata.size > 0 ? (
				// Display info for favorited location(s)
				<LocationInfoCard
					id={favorites[displayLocIdx]}
					metadata={stationMetadata.get(favorites[displayLocIdx])!}
					position={displayLocIdx}
					changePosition={setDisplayLocIdx}
					neighbors={favorites}
					key={displayLocIdx}
				/>
			) : (
				<h3>Loading data...</h3>
			)}
		</div>
	);
}
