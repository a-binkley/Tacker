import { createSlice } from '@reduxjs/toolkit';

import { StationInfo } from '../functions';
import { StationMetadata } from '../pages';

export type MetadataSerializableType = { [id: string]: StationMetadata };
export type DataSerializableType = { [id: string]: StationInfo };

const initialState: {
	favoritesIDs: string[];
	viewingIndex: number;
	metadata: MetadataSerializableType;
	data: DataSerializableType;
	generalUnitType: 'english' | 'metric';
	windspeedUnitType: 'mph' | 'km/h' | 'm/s' | 'kn';
} = {
	favoritesIDs: JSON.parse(localStorage.getItem('favoriteStations') ?? '[]'), // read from localStorage first, if present
	viewingIndex: 0,
	metadata: {},
	data: {},
	generalUnitType: 'english',
	windspeedUnitType: 'mph'
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
		setGeneralUnitType: (state, action: { payload: 'english' | 'metric' }) => {
			state.generalUnitType = action.payload;
		},
		setWindspeedUnitType: (state, action: { payload: 'mph' | 'km/h' | 'm/s' | 'kn' }) => {
			state.windspeedUnitType = action.payload;
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
