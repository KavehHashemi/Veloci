import { createSlice } from "@reduxjs/toolkit";

const userMode: boolean | null =
  localStorage.getItem("isLightMode") === "true" ? true : false;

const initialState = {
  isLightMode: userMode || false,
};

export const modeSlice = createSlice({
  name: "modes",
  initialState,
  reducers: {
    setLightMode: (state, action) => {
      state.isLightMode = action.payload;
      localStorage.setItem("isLightMode", state.isLightMode.toString());
    },
  },
});
export const { setLightMode } = modeSlice.actions;
export default modeSlice.reducer;
