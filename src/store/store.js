import { configureStore } from '@reduxjs/toolkit';
import movlixReducer from './movlixSlice';

export const store = configureStore({
    reducer: {
        movlixData: movlixReducer,
    },
});
