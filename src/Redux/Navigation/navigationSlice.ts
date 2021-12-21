import { createSlice } from "@reduxjs/toolkit";

export interface NavigationState {
  isOpen: boolean;
}

const initialState: NavigationState = {
  isOpen: true,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    openNavigation: (state) => {
      state.isOpen = true;
    },
    closeNavigation: (state) => {
      state.isOpen = false;
    },
    toggleNavigation: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openNavigation, closeNavigation, toggleNavigation } =
  navigationSlice.actions;

export default navigationSlice.reducer;
