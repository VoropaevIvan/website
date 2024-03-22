import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h2>Страница не найдена</h2>
      <h3>
        <NavLink to="/">Вернуться на главную страницу</NavLink>
      </h3>
    </>
  );
};

export default NotFound;
