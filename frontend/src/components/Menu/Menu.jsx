import { NavLink, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  console.log(page);
  return (
    <div className="menu">
      <span>
        <NavLink to="/" end>
          На главную
        </NavLink>
        <NavLink to="/bank">Банк задач</NavLink>
        <NavLink
          to="/addtask"
          className={page === "edit-task" ? " active" : ""}
        >
          Добавление задачи
        </NavLink>
        <NavLink to="/variant">Вариант</NavLink>
        <NavLink to="/test">Тест</NavLink>
      </span>
    </div>
  );
};

export default Menu;
