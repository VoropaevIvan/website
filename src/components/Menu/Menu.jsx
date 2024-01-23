import { NavLink } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menu">
      <span>
        <NavLink to="/" end>
          На главную
        </NavLink>
        <NavLink to="/bank">Банк задач</NavLink>
        <NavLink to="/addtask">Добавление задачи</NavLink>
        <NavLink to="/edit-task">Редактирование задачи</NavLink>
        <NavLink to="/test">Тест</NavLink>
      </span>
    </div>
  );
};

export default Menu;
