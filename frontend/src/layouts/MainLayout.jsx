import { Outlet } from "react-router-dom";
import Menu from "../components/Menu/Menu";
//import NavBar from "../components/NotUsed/NavBar";

const MainLayout = () => {
  return (
    <>
      <Menu />
      {/* <NavBar /> */}
      <Outlet />
    </>
  );
};

export default MainLayout;
