import { Outlet, useLocation } from "react-router-dom";
import Menu from "../components/Pages/Menu/Menu";

const MainLayout = () => {
  const location = useLocation();

  const page = location.pathname.split("/").reverse()[1];
  const menuClass = page === "results" ? "varresmenu" : " ";

  return (
    <>
      {page !== "variant" ? <Menu menuClass={menuClass} /> : ""}
      {/* <NavBar /> */}
      <Outlet />
    </>
  );
};

export default MainLayout;
