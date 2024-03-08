import { configureStore } from "@reduxjs/toolkit";
import variantReducer from "./slices/variantSlice";

const store = configureStore({
  reducer: {
    variant: variantReducer,
  },
});

export default store;
