import { NavLink } from "react-router-dom";
import "./VarMenu.css";
function VarMenu() {
  return (
    <span className="varMenuSpan">
      <NavLink to="/" end>
        На главную
      </NavLink>
    </span>
  );
}

export default VarMenu;
