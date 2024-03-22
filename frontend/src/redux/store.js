import { configureStore } from "@reduxjs/toolkit";
import variantReducer from "./slices/variantSlice";
import bankFilterReducer from "./slices/bankFilterSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    variant: variantReducer,
    bankFilter: bankFilterReducer,
    auth: authReducer,
  },
});

export default store;
