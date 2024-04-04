import { NavLink, useLocation } from "react-router-dom";
import "./VarMenu.css";

function VarMenu() {
  const location = useLocation();

  const varName = location.pathname.split("/").reverse()[0];
  return (
    <>
      <NavLink to="/" end>
        На главную
      </NavLink>
      <NavLink to={"/results/" + varName} end>
        Завершить вариант
      </NavLink>
    </>
  );
}

export default VarMenu;
