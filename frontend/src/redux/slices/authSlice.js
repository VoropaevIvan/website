import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isAdmin: false,
  hasToken: false,
  name: "",
  surname: "",
  img: "",
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
    setImg: (state, action) => {
      return { ...state, img: action.payload };
    },
    setIsAdmin: (state, action) => {
      return { ...state, isAdmin: action.payload };
    },
    setHasToken: (state, action) => {
      return { ...state, hasToken: action.payload };
    },
    logOut: (state, action) => {
      localStorage.removeItem("jwt");
      return { ...initialState };
    },
    setDataFromToken: (state, action) => {
      const isAdminUser = action.payload.userRole === "ADMIN" ? true : false;
      return {
        ...state,
        name: action.payload.userName,
        surname: action.payload.userSurname,
        img: action.payload.userPhotoUrl,
        isAuth: true,
        isAdmin: isAdminUser,
      };
    },
  },
});

export const setIsAuth = authSlice.actions.setIsAuth;
export const setName = authSlice.actions.setName;
export const setSurname = authSlice.actions.setSurname;
export const setImg = authSlice.actions.setImg;
export const setHasToken = authSlice.actions.setHasToken;
export const setIsAdmin = authSlice.actions.setIsAdmin;
export const logOut = authSlice.actions.logOut;
export const setDataFromToken = authSlice.actions.setDataFromToken;

export default authSlice.reducer;
