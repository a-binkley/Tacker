import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMetadata, setData, setFavorites, MetadataSerializableType, DataSerializableType } from '../app/stationData';
import store from '../app/store';
import { LocationInfoCard, LocatorPopup } from '../components';
import { retrieveCurrentStations, retrieveLocationData } from '../functions';

export type RootState = ReturnType<typeof store.getState>;
export type StationMetadata = { city: string; state: string; coords: { lat: number; lng: number } };

export function Home() {
	const data: DataSerializableType = useSelector<RootState, any>((state) => state.data);
	const metadata: MetadataSerializableType = useSelector<RootState, any>((state) => state.metadata);
	const favoritesIDs: string[] = useSelector<RootState, any>((state) => state.favoritesIDs);
	const viewingIndex: number = useSelector<RootState, any>((state) => state.viewingIndex);
	const dispatch = useDispatch();

	const [searchMode, setSearchMode] = useState<'prompt' | 'search' | 'display'>(favoritesIDs.length === 0 ? 'prompt' : 'display');

	useEffect(() => {
		if (Object.keys(metadata).length === 0) {
			retrieveCurrentStations().then(
				(metadataRes) => {
					dispatch(setMetadata(metadataRes));
				},
				(metadataErr) => {
					console.error('Unable to retrieve station metadata');
					console.error(metadataErr);
				}
			);
		} else if (searchMode === 'display') {
			retrieveLocationData(favoritesIDs, metadata, 'fahrenheit', 'mph', 'inch', 'imperial').then(
				(dataRes) => {
					dispatch(setData(dataRes));
				},
				(dataErr) => {
					console.error('Could not retrieve location data');
					console.error(dataErr);
				}
			);
		}
	}, [dispatch, data, metadata, favoritesIDs, searchMode]);

	const handleFavoriteChange = (stationID: string) => {
		if (favoritesIDs.includes(stationID)) {
			dispatch(setFavorites(favoritesIDs.filter((id: string) => id !== stationID))); // Remove
		} else {
			dispatch(setFavorites(favoritesIDs.concat([stationID]))); // Add
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
				<LocatorPopup {...{ handleFavoriteChange, setSearchMode }} />
			) : data[favoritesIDs[viewingIndex]] ? (
				// Display info for favorited location(s)
				<LocationInfoCard
					id={favoritesIDs[viewingIndex]}
					data={data[favoritesIDs[viewingIndex]]}
					key={`LocationCard-${viewingIndex}`}
				/>
			) : (
				// TODO: make more robust
				<div>{'' && console.log(searchMode)}</div>
			)}
		</div>
	);
}
