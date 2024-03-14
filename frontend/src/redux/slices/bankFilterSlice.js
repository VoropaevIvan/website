import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numberEGE: "Все",
};

const bankFilterSlice = createSlice({
  name: "bankFilter",
  initialState: initialState,
  reducers: {
    setNumberEGEFilter: (state, action) => {
      return { ...state, numberEGE: action.payload };
    },
  },
});

export const setNumberEGEFilter = bankFilterSlice.actions.setNumberEGEFilter;

export default bankFilterSlice.reducer;
