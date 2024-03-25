import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./components/Pages/MainPage/MainPage";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { setDataFromToken } from "./redux/slices/authSlice";
import { adminRoutes, authRoutes, publicRoutes } from "./routes";
import "./App.css";

function App() {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isAuth = authData.isAuth;
  const isAdmin = authData.isAdmin;
  const jwt = localStorage.getItem("jwt");
  const { decodedToken } = useJwt(jwt);

  useEffect(() => {
    async function fetchData() {
      if (decodedToken) {
        dispatch(setDataFromToken(decodedToken));
      }
    }

    fetchData();
  }, [decodedToken, dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<MainPage />}></Route>

            {isAdmin &&
              adminRoutes.map(({ path, Component }, i) => {
                return (
                  <Route key={i} path={path} element={<Component />}></Route>
                );
              })}

            {isAuth &&
              authRoutes.map(({ path, Component }, i) => {
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
