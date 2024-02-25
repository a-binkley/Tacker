import { createSlice } from '@reduxjs/toolkit';

import { StationInfo } from '../functions';
import { StationMetadata } from '../pages';

export type MetadataSerializableType = { [id: string]: StationMetadata };
export type DataSerializableType = { [id: string]: StationInfo };
export type GeneralUnitType = 'english' | 'metric';
export type WindspeedUnitType = 'mph' | 'km/h' | 'm/s' | 'kn';

const initialState: {
	favoritesIDs: string[];
	viewingIndex: number;
	metadata: MetadataSerializableType;
	data: DataSerializableType;
	generalUnit: GeneralUnitType;
	windspeedUnit: WindspeedUnitType;
} = {
	favoritesIDs: JSON.parse(localStorage.getItem('favoriteStations') ?? '[]'), // read from localStorage first, if present
	viewingIndex: 0,
	metadata: {},
	data: {},
	generalUnit: 'english',
	windspeedUnit: 'mph'
};

export const stationDataSlice = createSlice({
	name: 'stationData',
	initialState,
	reducers: {
		setFavorites: (state, action: { payload: string[] }) => {
			state.favoritesIDs = action.payload;
			localStorage.setItem('favoriteStations', JSON.stringify(action.payload)); // save for use in later sessions
		},
		setMetadata: (state, action: { payload: { [id: string]: StationMetadata } }) => {
			state.metadata = action.payload;
		},
		setData: (state, action: { payload: { [id: string]: StationInfo } }) => {
			state.data = { ...state.data, ...action.payload };
		},
		setGeneralUnitType: (state, action: { payload: GeneralUnitType }) => {
			state.generalUnit = action.payload;
		},
		setWindspeedUnitType: (state, action: { payload: WindspeedUnitType }) => {
			state.windspeedUnit = action.payload;
		},
		updateViewingIndex: (state, action) => {
			state.viewingIndex += action.payload;
		}
	}
});

// Action creators are generated for each case reducer function
export const { setFavorites, setMetadata, setData, setGeneralUnitType, setWindspeedUnitType, updateViewingIndex } =
	stationDataSlice.actions;

export default stationDataSlice.reducer;
