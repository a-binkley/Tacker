import { useEffect, useState } from 'react';

import { retrieveCurrentStations, StationInfo } from '../functions';
import { LocationInfoCard, Locator, LocatorPopup } from '../components';

export function Home() {
	const [allStations, setAllStations] = useState<StationInfo[]>([]);
	const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem('favoriteStations') ?? '[]'));
	const [searchMode, setSearchMode] = useState(false);

	useEffect(() => {
		if (allStations.length === 0) {
			retrieveCurrentStations(setAllStations);
		}
		localStorage.setItem('favoriteStations', JSON.stringify(favorites));
	}, [allStations.length, favorites]);

	const handleFavoriteChange = (stationInfo: StationInfo, existingFavorite: boolean) => {
		if (existingFavorite) {
			setFavorites(favorites.filter((station) => station !== stationInfo.id)); // Remove
		} else {
			setFavorites(favorites.concat([stationInfo.id])); // Add
		}
	};

	const isFavorite = (stationID: string) => favorites.some((station) => station === stationID);

	return (
		<>
			<Locator />
			<LocationInfoCard id={'9075080'} />
			{searchMode && <LocatorPopup {...{ stations: allStations, isFavorite, handleFavoriteChange }} />}
		</>
	);
}
