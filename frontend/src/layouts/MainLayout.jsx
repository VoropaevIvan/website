import { Outlet, useLocation } from "react-router-dom";
import Menu from "../components/Pages/Menu/Menu";

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.split("/").reverse()[1] !== "variant" ? <Menu /> : ""}
      {/* <NavBar /> */}
      <Outlet />
    </>
  );
};

export default MainLayout;
