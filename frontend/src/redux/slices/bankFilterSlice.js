import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numberEGE: "Все",
  sorting: "data",
};

const bankFilterSlice = createSlice({
  name: "bankFilter",
  initialState: initialState,
  reducers: {
    setNumberEGEFilter: (state, action) => {
      return { ...state, numberEGE: action.payload };
    },
    setSortingFilter: (state, action) => {
      return { ...state, sorting: action.payload };
    },
  },
});

export const setNumberEGEFilter = bankFilterSlice.actions.setNumberEGEFilter;
export const setSortingFilter = bankFilterSlice.actions.setSortingFilter;

export default bankFilterSlice.reducer;
