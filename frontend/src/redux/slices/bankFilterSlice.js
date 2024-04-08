import { createSlice } from "@reduxjs/toolkit";
import { ALL_VARIANTS_TASK_NUMBER } from "../../components/Pages/Bank/Filter/constants";
import {
  ALL_ACTUALITY,
  ALL_DIFFICULTY,
  NOT_AND_OFFICIAL_TASK,
  ALL_STATUS,
} from "../../components/Pages/constants";
const initialState = {
  numberEGE: ALL_VARIANTS_TASK_NUMBER,
  isOfficial: NOT_AND_OFFICIAL_TASK,
  actuality: ALL_ACTUALITY,
  difficulty: ALL_DIFFICULTY,
  solveStatus: ALL_STATUS,
  sorting: "Сначала новые",
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
    setIsOfficialFilter: (state, action) => {
      return { ...state, isOfficial: action.payload };
    },
    setActualityFilter: (state, action) => {
      return { ...state, actuality: action.payload };
    },
    setDifficultyFilter: (state, action) => {
      return { ...state, difficulty: action.payload };
    },
    setSolveStatusFilter: (state, action) => {
      return { ...state, solveStatus: action.payload };
    },
  },
});

export const setNumberEGEFilter = bankFilterSlice.actions.setNumberEGEFilter;
export const setSortingFilter = bankFilterSlice.actions.setSortingFilter;
export const setIsOfficialFilter = bankFilterSlice.actions.setIsOfficialFilter;
export const setActualityFilter = bankFilterSlice.actions.setActualityFilter;
export const setDifficultyFilter = bankFilterSlice.actions.setDifficultyFilter;
export const setSolveStatusFilter =
  bankFilterSlice.actions.setSolveStatusFilter;

export default bankFilterSlice.reducer;
