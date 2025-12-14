import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bannerData: [],
    imageURL: '',
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
    },
});

export const { setBanerData, setImageURL } = movlixSlice.actions;
export default movlixSlice.reducer;
