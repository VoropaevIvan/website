import { NavLink } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <nav className="menu">
      <NavLink to="/" end>
        На главную
      </NavLink>
      <NavLink to="/bank">Банк задач</NavLink>
      <NavLink to="/editor">Редактор</NavLink>
      <NavLink to="/addtask">Добавление задачи</NavLink>
      <NavLink to="/edit-task">Редактирование задачи</NavLink>
      <NavLink to="/test">Тест</NavLink>
    </nav>
  );
};

export default Menu;
