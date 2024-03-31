import { NavLink } from "react-router-dom";
import "./VarMenu.css";
function VarMenu() {
  return (
    <>
      <NavLink to="/" end>
        На главную
      </NavLink>
      <NavLink to="/results" end>
        Завершить вариант
      </NavLink>
    </>
  );
}

export default VarMenu;
