import { createSlice } from '@reduxjs/toolkit';

/**
 * videoCanvasSlice - js
 */

const initialState = {
    contrast: 1.0,
    saturation: 1.0,
    brightness: 0.0,
    blur: 0,
}

const videoCanvasSlice = createSlice({
    name: "videoCanvas",
    initialState,
    reducers: {
        setContrastVideo: (state, action) => {
            state.contrast = action.payload
        },
        setSaturationVideo: (state, action) => {
            state.saturation = action.payload
        },
        setBrightnessVideo: (state, action) => {
            state.brightness = action.payload
        },
        setBlurVideo: (state, action) => {
            state.blur = action.payload
        },
        resetVideoCanvas: (state) => {
            state.contrast = initialState.contrast,
            state.saturation = initialState.saturation,
            state.brightness = initialState.brightness,
            state.blur = initialState.blur
        }
    }
})

export const {
    setContrastVideo, setSaturationVideo, setBrightnessVideo,
    setBlurVideo,
    resetVideoCanvas
} = videoCanvasSlice.actions

export default videoCanvasSlice.reducer