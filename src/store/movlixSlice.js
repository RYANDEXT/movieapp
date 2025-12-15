import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bannerData: [],
    imageURL: '',
    loading: false,
};

export const movlixSlice = createSlice({
    name: 'movlix',
    initialState,
    reducers: {
        setBanerData: (state, action) => {
            state.bannerData = action.payload;
        },
        setImageURL: (state, action) => {
            state.imageURL = action.payload;
        },
        setGlobalLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setBanerData, setImageURL, setGlobalLoading } = movlixSlice.actions;
export default movlixSlice.reducer;
