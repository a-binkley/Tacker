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
	hasNewData: boolean;
	generalUnit: GeneralUnitType;
	windspeedUnit: WindspeedUnitType;
	waveAnimation: boolean;
};

// TODO: add drag-and-drop reorder favorites

const initFavorites: string[] = JSON.parse(localStorage.getItem('favoriteStations') ?? '[]'); // read from localStorage first, if present

const initialState: StoreType = {
	searchMode: initFavorites.length === 0 ? 'prompt' : 'display',
	favoritesIDs: initFavorites,
	viewingIndex: parseInt(localStorage.getItem('viewingIndex') ?? '0'),
	metadata: {},
	data: {},
	hasNewData: true, // always fetch on page load
	generalUnit: (localStorage.getItem('generalUnit') as GeneralUnitType) ?? 'english',
	windspeedUnit: (localStorage.getItem('windspeedUnit') as WindspeedUnitType) ?? 'mph',
	waveAnimation: localStorage.getItem('waveAnimation') === 'true'
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
		setHasNewData: (state, action: { payload: boolean }) => {
			state.hasNewData = action.payload;
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
			localStorage.setItem('viewingIndex', `${state.viewingIndex}`);
		},
		setWaveAnimation: (state, action: { payload: boolean }) => {
			state.waveAnimation = action.payload;
			localStorage.setItem('waveAnimation', action.payload ? 'true' : 'false');
		}
	}
});

// Action creators are generated for each case reducer function
export const {
	setSearchMode,
	setFavorites,
	setMetadata,
	setData,
	setHasNewData,
	setGeneralUnitType,
	setWindspeedUnitType,
	updateViewingIndex,
	setWaveAnimation
} = stationDataSlice.actions;

export default stationDataSlice.reducer;
