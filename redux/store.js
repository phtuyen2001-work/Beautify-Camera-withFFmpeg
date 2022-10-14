import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./slice/canvasSlice";

export const store = configureStore({
    reducer: {
        canvasCam: canvasReducer
    },
})