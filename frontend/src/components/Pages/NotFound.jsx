import { NavLink } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <h2>Страница не найдена</h2>
      <p>
        <NavLink to="/">Вернуться на главную страницу</NavLink>
      </p>
    </div>
  );
};

export default NotFound;
