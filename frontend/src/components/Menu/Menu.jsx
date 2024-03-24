import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoByJwt } from "../server/serverAuth";

import "./Menu.css";
import { logOut } from "../../redux/slices/authSlice";
import { useState } from "react";

const Menu = () => {
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const isAuth = authData.isAuth;
  const isAdmin = authData.isAdmin;
  const img = authData.img;

  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  return (
    <div className="menu">
      <span>
        <NavLink to="/" end>
          На главную
        </NavLink>
        <NavLink to="/bank">Банк задач</NavLink>

        <NavLink to="/variants">Варианты</NavLink>

        {isAdmin && (
          <NavLink
            reloadDocument
            to="/addtask"
            className={page === "edit-task" ? " active" : ""}
          >
            Добавление задачи
          </NavLink>
        )}
        {isAuth ? (
          <div className="drop">
            <img
              onClick={() => {
                setShowDropDownMenu(!showDropDownMenu);
              }}
              className="photo"
              src={img}
              alt=""
            ></img>
            {showDropDownMenu && (
              <ul className="ul">
                <li>
                  <NavLink
                    onClick={() => {
                      setShowDropDownMenu(false);
                    }}
                    to="lk"
                  >
                    Личный кабинет
                  </NavLink>
                </li>
                <li
                  className="exit"
                  onClick={() => {
                    dispatch(logOut());
                  }}
                >
                  Выйти
                </li>
              </ul>
            )}
          </div>
        ) : (
          <NavLink className="login" to="/auth">
            Войти
          </NavLink>
        )}
        {/* <NavLink to="/test">Тест</NavLink> */}
      </span>
    </div>
  );
};

export default Menu;
