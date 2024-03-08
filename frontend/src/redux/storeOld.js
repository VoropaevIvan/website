import { configureStore } from "@reduxjs/toolkit";
import newTaskReducer from "./slices/newTaskSlice";

const store = configureStore({
  reducer: {
    newTask: newTaskReducer,
  },
});

export default storeOld;
