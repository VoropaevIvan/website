import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  answer: "",
  numberEGE: "",
};

const newTaskSlice = createSlice({
  name: "newTask",
  initialState: initialState,
  reducers: {
    setTextNewTask: (state, action) => {
      return { ...state, text: action.payload };
    },
  },
});

export const setTextNewTask = newTaskSlice.actions.setTextNewTask;

export default newTaskSlice.reducer;
