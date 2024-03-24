import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import MainPage from "./components/Pages/MainPage/MainPage";
import { useEffect } from "react";
import { getUserInfoByJwt } from "./components/server/serverAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  setImg,
  setIsAdmin,
  setIsAuth,
  setName,
  setSurname,
} from "./redux/slices/authSlice";
import { adminRoutes, publicRoutes } from "./routes";
import "./App.css";

function App() {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isAuth = authData.isAuth;

  useEffect(() => {
    async function fetchData() {
      if (authData.isAuth === false) {
        if (localStorage.getItem("jwt")) {
          const res = getUserInfoByJwt(localStorage.getItem("jwt"));
          dispatch(setName(res.name));
          dispatch(setSurname(res.surname));
          dispatch(setIsAdmin(res.isAdmin));
          dispatch(setImg(res.img));
          dispatch(setIsAuth(true));
        }
      }
    }

    fetchData();
  }, [authData, dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<MainPage />}></Route>

            {isAuth &&
              adminRoutes.map(({ path, Component }, i) => {
                return (
                  <Route key={i} path={path} element={<Component />}></Route>
                );
              })}
            {publicRoutes.map(({ path, Component }, i) => {
              return (
                <Route key={i} path={path} element={<Component />}></Route>
              );
            })}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
