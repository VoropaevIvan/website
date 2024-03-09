import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: "init",
  answers: {},
  currentTask: 0,
  data: [],
};

const variantSlice = createSlice({
  name: "variant",
  initialState: initialState,
  reducers: {
    setTitleVariant: (state, action) => {
      return { ...state, title: action.payload };
    },
    setCurrentTask: (state, action) => {
      return { ...state, currentTask: action.payload };
    },
    setAnswer: (state, action) => {
      const newAnswers = { ...state.answers };
      newAnswers[action.payload.taskNumber] = action.payload.newAnswer;
      return { ...state, answers: newAnswers };
    },
    clearAnswer: (state, action) => {
      const newAnswers = { ...state.answers };
      delete newAnswers[action.payload];
      return { ...state, answers: newAnswers };
    },
    setData: (state, action) => {
      return { ...state, data: action.payload };
    },
  },
});

export const setTitleVariant = variantSlice.actions.setTitleVariant;
export const setCurrentTask = variantSlice.actions.setCurrentTask;
export const setAnswer = variantSlice.actions.setAnswer;
export const clearAnswer = variantSlice.actions.clearAnswer;
export const setData = variantSlice.actions.setData;
export default variantSlice.reducer;
