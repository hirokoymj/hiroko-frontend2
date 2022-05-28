import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryFilterState {
  value: string[];
}

const initialState: CategoryFilterState = {
  value: [],
};

export const categoryFilterSlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
    updateCategoryFilter: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
    resetCategoryFilter: (state) => {
      state.value = [];
    },
  },
});

export const { setCategoryFilter, updateCategoryFilter, resetCategoryFilter } =
  categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;
