import { createSlice } from '@reduxjs/toolkit';
import { StationInfo } from '../functions';

import { StationMetadata } from '../pages';

const placeholderMetadata: { [id: string]: StationMetadata } = {};
const placeholderData: { [id: string]: StationInfo } = {};

export type MetadataSerializableType = typeof placeholderMetadata;
export type DataSerializableType = typeof placeholderData;

export const stationDataSlice = createSlice({
	name: 'stationData',
	initialState: {
		favoritesIDs: JSON.parse(localStorage.getItem('favoriteStations') ?? '[]'), // read from localStorage first, if present
		viewingIndex: 0,
		metadata: placeholderMetadata,
		data: placeholderData
	},
	reducers: {
		setMetadata: (state, action: { payload: { [id: string]: StationMetadata } }) => {
			state.metadata = action.payload;
		},
		setData: (state, action: { payload: { [id: string]: StationInfo } }) => {
			state.data = { ...state.data, ...action.payload };
		},
		updateViewingIndex: (state, action) => {
			state.viewingIndex += action.payload;
		}
	}
});

// Action creators are generated for each case reducer function
export const { setMetadata, setData, updateViewingIndex } = stationDataSlice.actions;

export default stationDataSlice.reducer;
