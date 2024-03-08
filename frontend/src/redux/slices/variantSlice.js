import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: "init",
  answers: {},
  currentTask: 0,
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
  },
});

export const setTitleVariant = variantSlice.actions.setTitleVariant;
export const setCurrentTask = variantSlice.actions.setCurrentTask;
export const setAnswer = variantSlice.actions.setAnswer;
export default variantSlice.reducer;
