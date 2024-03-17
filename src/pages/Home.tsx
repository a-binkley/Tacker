import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	setMetadata,
	setData,
	MetadataSerializableType,
	DataSerializableType,
	SearchMode,
	setSearchMode
} from '../app/stationData';
import store from '../app/store';
import { LocationInfoCard, LocatorPopup } from '../components';
import { retrieveCurrentStations, retrieveLocationData } from '../functions';

import './Home.css';

export type RootState = ReturnType<typeof store.getState>;
export type StationMetadata = { city: string; state: string; coords: { lat: number; lng: number } };

export function Home() {
	const data = useSelector<RootState, DataSerializableType>((state) => state.data);
	const metadata = useSelector<RootState, MetadataSerializableType>((state) => state.metadata);
	const searchMode = useSelector<RootState, SearchMode>((state) => state.searchMode);
	const favoritesIDs = useSelector<RootState, string[]>((state) => state.favoritesIDs);
	const viewingIndex = useSelector<RootState, number>((state) => state.viewingIndex);
	const dispatch = useDispatch();

	useEffect(() => {
		if (Object.keys(metadata).length === 0) {
			retrieveCurrentStations().then(
				(metadataRes) => {
					if (Object.keys(metadataRes).length > 0) dispatch(setMetadata(metadataRes));
				}
				// errors handled in invoked function
			);
		} else if (searchMode === 'display' && Object.keys(data).length === 0) {
			retrieveLocationData({
				locs: favoritesIDs,
				locMetadata: metadata
			}).then(
				(dataRes) => {
					if (Object.keys(dataRes).length > 0) dispatch(setData(dataRes));
				}
				// errors handled in invoked function
			);
		}
	}, [dispatch, data, metadata, favoritesIDs, searchMode]);

	return (
		<div className='home-wrapper'>
			{searchMode === 'prompt' ? (
				// Ask the user to add at least one location as a favorite
				<div className='locator-prompt'>
					<h3 className='locator-notice'>
						{"Hm... it looks like you don't have any locations marked as favorites yet."}
					</h3>
					<button className='locator-search-btn' onClick={() => dispatch(setSearchMode('search'))}>
						Find a station
					</button>
				</div>
			) : searchMode === 'search' ? (
				// Display the Leaflet map to allow user to add station(s) to favorites
				<LocatorPopup />
			) : data[favoritesIDs[viewingIndex]] ? (
				// Display info for favorited location(s)
				<LocationInfoCard
					id={favoritesIDs[viewingIndex]}
					data={data[favoritesIDs[viewingIndex]]}
					key={`LocationCard-${viewingIndex}`}
				/>
			) : (
				// Loading spinner while API requests complete
				<div className='home-loading-wrapper'>
					<p className='home-loading-label'>Fetching weather data...</p>
					<div className='home-loading-spinner' />
					{'' && searchMode}
				</div>
			)}
		</div>
	);
}
