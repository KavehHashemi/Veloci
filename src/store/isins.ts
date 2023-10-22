import { createSlice } from "@reduxjs/toolkit";
import { addISINToList, removeISINFromList } from "../utils";

type RelevantResponse = {
  [name: string]: { isin: string; price: number; ask: number; bid: number };
};

type isinsList = {
  isins: string[];
  currentISIN: string | undefined;
  lastRelevantResponses: RelevantResponse;
};

const initialState: isinsList = {
  isins: JSON.parse(localStorage.getItem("ISINs")) || [],
  currentISIN: undefined,
  lastRelevantResponses: {},
};

export const isinSlice = createSlice({
  name: "isins",
  initialState,
  reducers: {
    initiateLocalStorage: () => {
      //if localstorage is empty, one will be created
      if (!localStorage.getItem("ISINs")) localStorage.setItem("ISINs", "[]");
    },
    updateLastRelevantResponses: (state, action) => {
      //when a new JsonMessage is recieved from the websocket, it will be stored
      //in its corresponding json object to be used when we have no new value for that
      //particular instrument
      if (action.payload)
        state.lastRelevantResponses[action.payload?.isin] = action.payload;
    },
    addIsin: (state, action) => {
      //when the user successfully subscribes to a new ISIN
      //it will be added to redux state, and will also be stored
      //in localstorage for future runs
      state.isins.push(action.payload);
      addISINToList(action.payload);
    },
    removeIsin: (state, action) => {
      //when the user unsubscribes from an ISIN
      //it will be removed from redux state, and will also be removed
      //from localstorage
      state.isins = state.isins.filter((singleIsin) => {
        return singleIsin !== action.payload;
      });
      removeISINFromList(action.payload);
    },
    //a currentISIN is stored for chart page
    setCurrentISIN: (state, action) => {
      state.currentISIN = action.payload;
    },
  },
});
export const {
  addIsin,
  removeIsin,
  initiateLocalStorage,
  updateLastRelevantResponses,
  setCurrentISIN,
} = isinSlice.actions;
export default isinSlice.reducer;
