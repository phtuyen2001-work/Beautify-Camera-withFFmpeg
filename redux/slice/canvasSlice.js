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
        blur: 0,
        negative: 0,
        flyeye: 0,

        stickers: [],
        texts: [],
        selectedText: {}
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
        setNegative: (state, action) => {
            state.negative = action.payload
        },
        setFlyeye: (state, action) => {
            state.flyeye = action.payload
        },

        addSticker: (state, action) => {
            state.stickers = [...state.stickers, action.payload]
        },
        removeSticker: (state, action) => {
            state.stickers = [...state.stickers].filter((item) => item.id !== action.payload)
        },
        resetSticker: (state) => {
            state.stickers.splice(0, state.stickers.length)
        },

        addText: (state, action) => {
            state.texts = [...state.texts, action.payload]
        },
        setSeletedText: (state, action) => {
            state.selectedText = { ...action.payload }

            let ind = state.texts.findIndex(e => e.id === state.selectedText.id)
            state.texts[ind] = { ...state.selectedText }
        },
        changeText: (state, action) => {
            let ind = state.texts.findIndex(e => e.id === action.payload.id)
            state.texts[ind] = { ...action.payload }

        },
        removeText: (state, action) => {
            state.texts = [...state.texts].filter((item) => item.id !== action.payload)
        },
        resetText: (state) => {
            state.texts.splice(0, state.texts.length)
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
            state.negative = 0
            state.flyeye = 0,

                state.stickers = []
            state.texts = []
            state.selectedText = {}
        }
    }
});

export const {
    setColorMatrix, setColorOffset,
    setContrast, setSaturation, setBrightness,
    setBlur,
    setNegative,
    setFlyeye,

    addSticker,
    removeSticker,
    resetSticker,

    addText,
    removeText,
    resetText,
    changeText,
    setSeletedText,

    resetCanvas
} = canvasSlice.actions

export default canvasSlice.reducer