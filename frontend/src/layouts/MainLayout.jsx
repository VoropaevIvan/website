import { Outlet, useLocation } from "react-router-dom";
import Menu from "../components/Menu/Menu";
//import NavBar from "../components/NotUsed/NavBar";

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/variant" ? <Menu /> : ""}
      {/* <NavBar /> */}
      <Outlet />
    </>
  );
};

export default MainLayout;
