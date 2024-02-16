import { configureStore } from '@reduxjs/toolkit';
import stationDataReducer from './stationData';

export default configureStore({
	reducer: stationDataReducer
});
