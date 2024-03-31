import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DropDownMenu from "./components/DropDownMenu";
import "./Menu.css";

const Menu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const page = location.pathname.split("/")[1];

  const authData = useSelector((state) => state.auth);
  const { isAuth, isAdmin, img } = authData;

  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  const jwt = localStorage.getItem("jwt");
  if (jwt && !isAuth) {
    return (
      <div className="menu">
        <span></span>
      </div>
    );
  }

  return (
    <div className="menu">
      <NavLink to="/" end>
        На главную
      </NavLink>
      <NavLink to="/bank">Банк задач</NavLink>
      <NavLink to="/variants">Варианты</NavLink>

      {isAdmin && (
        <NavLink
          // reloadDocument
          to="/addtask"
          className={page === "edit-task" ? " active" : ""}
        >
          Добавление задачи
        </NavLink>
      )}

      {isAuth ? (
        <DropDownMenu
          showDropDownMenu={showDropDownMenu}
          setShowDropDownMenu={setShowDropDownMenu}
          dispatch={dispatch}
          img={img}
        />
      ) : (
        <NavLink className="login" to="/auth">
          Войти
        </NavLink>
      )}

      <NavLink to="/test">Тест</NavLink>
    </div>
  );
};

export default Menu;
