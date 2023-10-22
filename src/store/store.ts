import { configureStore } from "@reduxjs/toolkit";
import isinReducer from "./isins";
import messageReducer from "./messages";
import modeReducer from "./mode";

export const store = configureStore({
  reducer: {
    isin: isinReducer,
    message: messageReducer,
    mode: modeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
