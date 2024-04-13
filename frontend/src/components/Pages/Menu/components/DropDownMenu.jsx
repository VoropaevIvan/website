import { NavLink } from "react-router-dom";
import { logOut } from "../../../../redux/slices/authSlice";

import { FaAngleDown } from "react-icons/fa";
import "./DropDownMenu.css";

const DropDownMenu = ({
  showDropDownMenu,
  setShowDropDownMenu,
  dispatch,
  img,
}) => {
  return (
    <div
      className="drop"
      onClick={() => {
        setShowDropDownMenu(!showDropDownMenu);
      }}
    >
      <div className="photos">
        <img className="photo" src={img} alt="" draggable="false"></img>
        <FaAngleDown className="sdown" />
      </div>

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
  );
};

export default DropDownMenu;
