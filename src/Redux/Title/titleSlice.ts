import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TitleState {
  text: string;
}

const initialState: TitleState = {
  text: "",
};

export const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    resetTitle: (state) => {
      state.text = "";
    },
  },
});

export const { setTitle, resetTitle } = titleSlice.actions;

export default titleSlice.reducer;
