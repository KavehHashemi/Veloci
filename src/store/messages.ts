import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMessage: "",
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
  },
});
export const { setCurrentMessage } = messageSlice.actions;
export default messageSlice.reducer;
