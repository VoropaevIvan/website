import { NavLink } from "react-router-dom";
import { logOut } from "../../../../redux/slices/authSlice";

const DropDownMenu = ({
  showDropDownMenu,
  setShowDropDownMenu,
  dispatch,
  img,
}) => {
  return (
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
  );
};

export default DropDownMenu;
