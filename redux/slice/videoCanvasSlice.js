import { createSlice } from '@reduxjs/toolkit';

/**
 * videoCanvasSlice - js
 */

const initialState = {
    contrast: 1.0,
    saturation: 1.0,
    brightness: 0.0,
    gamma: 1.0
    // blur: 0,
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
        setGammaVideo: (state, action) => {
            state.gamma = action.payload
        },
        // setBlurVideo: (state, action) => {
        //     state.blur = action.payload
        // },
        resetVideoCanvas: (state) => {
            state.contrast = initialState.contrast,
            state.saturation = initialState.saturation,
            state.brightness = initialState.brightness,
            state.gamma = initialState.gamma
        }
    }
})

export const {
    setContrastVideo, setSaturationVideo, setBrightnessVideo,
    setGammaVideo,
    resetVideoCanvas
} = videoCanvasSlice.actions

export default videoCanvasSlice.reducer