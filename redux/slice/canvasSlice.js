import { createSlice } from '@reduxjs/toolkit';

export const canvasSlice = createSlice({
    name: "canvas",
    initialState: {
        contrast: 1,
        saturation: 1,
        brightness: 1
    },
    reducers: {
        setContrast: (state, action) => {
            state.contrast = action.payload
        },
        setSaturation: (state, action) => {
            state.saturation = action.payload
        },
        setBrightness: (state, action) => {
            state.brightness = action.payload
        },
    }
});

export const { 
    setContrast, setSaturation, setBrightness 
} = canvasSlice.actions

export default canvasSlice.reducer