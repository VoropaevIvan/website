import { configureStore } from "@reduxjs/toolkit";
import variantReducer from "./slices/variantSlice";
import bankFilterReducer from "./slices/bankFilterSlice";

const store = configureStore({
  reducer: {
    variant: variantReducer,
    bankFIlter: bankFilterReducer,
  },
});

export default store;
