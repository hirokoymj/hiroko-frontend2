import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CitySearchState {
  value: string;
}

const initialState: CitySearchState = {
  value: "",
};

export const citySearchSlice = createSlice({
  name: "citySearch",
  initialState,
  reducers: {
    setCitySearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    updateCitySearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetCitySearch: (state) => {
      state.value = "";
    },
  },
});

export const { setCitySearch, updateCitySearch, resetCitySearch } =
  citySearchSlice.actions;

export default citySearchSlice.reducer;
