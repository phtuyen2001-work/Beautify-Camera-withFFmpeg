import { createSlice } from '@reduxjs/toolkit';

export const canvasSlice = createSlice({
    name: "canvas",
    initialState: {
        matrix: [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ],
        offset: [0, 0, 0, 0],
        contrast: 1,
        saturation: 1,
        brightness: 1,
        blur: 0
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
        setBlur: (state, action) => {
            state.blur = action.payload
        },
        setColorMatrix: (state, action) => {
            state.matrix = action.payload
        },
        setColorOffset: (state, action) => {
            state.offset = action.payload
        },
        resetCanvas: (state) => {
            state.matrix = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]
            state.offset = [0, 0, 0, 0]
            state.contrast = 1
            state.saturation = 1
            state.brightness = 1
            state.blur = 0
        }
    }
});

export const {
    setColorMatrix, setColorOffset,
    setContrast, setSaturation, setBrightness, setBlur,
    resetCanvas
} = canvasSlice.actions

export default canvasSlice.reducer