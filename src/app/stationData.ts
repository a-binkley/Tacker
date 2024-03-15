import { createSlice } from '@reduxjs/toolkit';

import { StationInfo } from '../functions';
import { StationMetadata } from '../pages';

export type SearchMode = 'prompt' | 'search' | 'display';
export type MetadataSerializableType = { [id: string]: StationMetadata };
export type DataSerializableType = { [id: string]: StationInfo };
export type GeneralUnitType = 'english' | 'metric';
export type WindspeedUnitType = 'mph' | 'km/h' | 'm/s' | 'kn';

export type StoreType = {
	searchMode: SearchMode;
	favoritesIDs: string[];
	viewingIndex: number;
	metadata: MetadataSerializableType;
	data: DataSerializableType;
	generalUnit: GeneralUnitType;
	windspeedUnit: WindspeedUnitType;
};

const initFavorites: string[] = JSON.parse(localStorage.getItem('favoriteStations') ?? '[]'); // read from localStorage first, if present

const initialState: StoreType = {
	searchMode: initFavorites.length === 0 ? 'prompt' : 'display',
	favoritesIDs: initFavorites,
	viewingIndex: 0,
	metadata: {},
	data: {},
	generalUnit: (localStorage.getItem('generalUnit') as GeneralUnitType) ?? 'english',
	windspeedUnit: (localStorage.getItem('windspeedUnit') as WindspeedUnitType) ?? 'mph'
};

export const stationDataSlice = createSlice({
	name: 'stationData',
	initialState,
	reducers: {
		setSearchMode: (state, action: { payload: SearchMode }) => {
			state.searchMode = action.payload;
		},
		setFavorites: (state, action: { payload: string[] }) => {
			state.favoritesIDs = action.payload;
			localStorage.setItem('favoriteStations', JSON.stringify(action.payload)); // save for use in later sessions
		},
		setMetadata: (state, action: { payload: { [id: string]: StationMetadata } }) => {
			state.metadata = action.payload;
		},
		setData: (state, action: { payload: DataSerializableType }) => {
			state.data = { ...state.data, ...action.payload };
		},
		setGeneralUnitType: (state, action: { payload: GeneralUnitType }) => {
			state.generalUnit = action.payload;
			localStorage.setItem('generalUnit', action.payload);
		},
		setWindspeedUnitType: (state, action: { payload: WindspeedUnitType }) => {
			state.windspeedUnit = action.payload;
			localStorage.setItem('windspeedUnit', action.payload);
		},
		updateViewingIndex: (state, action) => {
			state.viewingIndex += action.payload;
		}
	}
});

// Action creators are generated for each case reducer function
export const { setSearchMode, setFavorites, setMetadata, setData, setGeneralUnitType, setWindspeedUnitType, updateViewingIndex } =
	stationDataSlice.actions;

export default stationDataSlice.reducer;
