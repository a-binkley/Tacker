import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	setMetadata,
	setData,
	setFavorites,
	MetadataSerializableType,
	DataSerializableType,
	GeneralUnitType,
	WindspeedUnitType
} from '../app/stationData';
import store from '../app/store';
import { LocationInfoCard, LocatorPopup } from '../components';
import { retrieveCurrentStations, retrieveLocationData } from '../functions';

export type RootState = ReturnType<typeof store.getState>;
export type StationMetadata = { city: string; state: string; coords: { lat: number; lng: number } };

export function Home() {
	const data = useSelector<RootState, DataSerializableType>((state) => state.data);
	const metadata = useSelector<RootState, MetadataSerializableType>((state) => state.metadata);
	const favoritesIDs = useSelector<RootState, string[]>((state) => state.favoritesIDs);
	const viewingIndex = useSelector<RootState, number>((state) => state.viewingIndex);
	const generalUnitType = useSelector<RootState, GeneralUnitType>((state) => state.generalUnit);
	const windspeedUnitType = useSelector<RootState, WindspeedUnitType>((state) => state.windspeedUnit);
	const dispatch = useDispatch();

	const [searchMode, setSearchMode] = useState<'prompt' | 'search' | 'display'>(favoritesIDs.length === 0 ? 'prompt' : 'display');

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
				locMetadata: metadata,
				windspeed_unit: windspeedUnitType,
				unit_type: generalUnitType
			}).then(
				(dataRes) => {
					if (Object.keys(dataRes).length > 0) dispatch(setData(dataRes));
				}
				// errors handled in invoked function
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
					<h3>{"It looks like you don't have any locations marked as favorites yet."}</h3>
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
