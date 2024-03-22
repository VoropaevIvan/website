import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  surname: "",
  hasToken: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsAuth: (state, action) => {
      return { ...state, isAuth: action.payload };
    },
    setName: (state, action) => {
      return { ...state, name: action.payload };
    },
    setSurname: (state, action) => {
      return { ...state, surname: action.payload };
    },
    setHasToken: (state, action) => {
      return { ...state, hasToken: action.payload };
    },
  },
});

export const setIsAuth = authSlice.actions.setIsAuth;
export const setName = authSlice.actions.setName;
export const setSurname = authSlice.actions.setSurname;
export const setHasToken = authSlice.actions.setHasToken;

export default authSlice.reducer;
