import { useEffect, useState } from 'react';

import { retrieveCurrentStations, StationInfo } from '../functions';
import { LocationInfoCard, LocatorPopup } from '../components';

export function Home() {
	const [allStations, setAllStations] = useState<StationInfo[]>([]);
	const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem('favoriteStations') ?? '[]'));
	const [searchMode, setSearchMode] = useState<0 | 1 | 2>(favorites.length === 0 ? 0 : 2); // 0 for prompt, 1 for search, 2 for display

	useEffect(() => {
		if (allStations.length === 0) {
			retrieveCurrentStations(setAllStations);
		}
		localStorage.setItem('favoriteStations', JSON.stringify(favorites));
	}, [allStations.length, favorites, searchMode]);

	const handleFavoriteChange = (stationInfo: StationInfo, existingFavorite: boolean) => {
		if (existingFavorite) {
			setFavorites(favorites.filter((station) => station !== stationInfo.id)); // Remove
		} else {
			setFavorites(favorites.concat([stationInfo.id])); // Add
		}
	};

	return (
		<>
			{searchMode === 0 ? (
				<div className="locator-prompt">
					<h3>It looks like you don't have any locations marked as favorites yet.</h3>
					<button onClick={() => setSearchMode(1)}>Find a station</button>
				</div>
			) : // TODO: make pretty
			searchMode === 1 ? (
				<LocatorPopup {...{ stations: allStations, favorites, handleFavoriteChange, setSearchMode }} />
			) : (
				<LocationInfoCard id={JSON.parse(localStorage.getItem('favoriteStations')!)[0]} />
			)}
		</>
	);
}
