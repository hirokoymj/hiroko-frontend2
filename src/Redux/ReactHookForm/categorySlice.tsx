import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  value: string;
}

const initialState: CategoryState = {
  value: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetCategory: (state) => {
      state.value = "";
    },
  },
});

export const { setCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
