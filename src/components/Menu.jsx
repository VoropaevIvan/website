import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <NavLink to="/" end>
        На главную
      </NavLink>
      <NavLink to="/bank">Банк задач</NavLink>
      <NavLink to="/editor">Редактор</NavLink>
    </nav>
  );
};

export default Menu;
