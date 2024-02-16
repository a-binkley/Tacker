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
		metadata: placeholderMetadata,
		data: placeholderData
	},
	reducers: {
		setMetadata: (state, action: { payload: { [id: string]: StationMetadata } }) => {
			state.metadata = action.payload;
			console.log('Updated Redux store metadata');
		},
		setData: (state, action: { payload: { id: string; data: StationInfo } }) => {
			state.data[action.payload.id] = action.payload.data;
			console.log('Updated Redux store data');
		}
	}
});

// Action creators are generated for each case reducer function
export const { setMetadata, setData } = stationDataSlice.actions;

export default stationDataSlice.reducer;
