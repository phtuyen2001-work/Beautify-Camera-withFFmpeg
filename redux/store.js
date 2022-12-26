import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./slice/canvasSlice";
import videoCanvasReducer from "./slice/videoCanvasSlice";

export const store = configureStore({
    reducer: {
        canvasCam: canvasReducer,
        videoCanvasCam: videoCanvasReducer
    },
})