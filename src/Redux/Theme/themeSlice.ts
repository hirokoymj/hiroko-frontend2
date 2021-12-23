import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  currentTheme: string;
}

const initialState: ThemeState = {
  currentTheme: "seasonal",
};

export const themeSlice = createSlice({
  name: "MUI_THEME",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.currentTheme = action.payload;
    },
    resetTheme: (state) => {
      state.currentTheme = "";
    },
  },
});

export const { setTheme, resetTheme } = themeSlice.actions;

export default themeSlice.reducer;
