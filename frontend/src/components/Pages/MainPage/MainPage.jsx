import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useEffect } from "react";
import "./MainPage.css";
import TopUsers from "./components/TopUsers";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      const parsed = queryString.parse(location.search);
      if (parsed?.payload) {
        const payload = JSON.parse(parsed.payload);
        if (payload) {
          console.log(payload);
          navigate("./", { relative: "path" });
        }
      }
    }

    fetchData();
  }, [location, navigate]);

  return (
    <div className="mainpage">
      <div>
        <h1>Лучшие пользователи сайта</h1>
      </div>

      <TopUsers />

      <div>
        <h2>Скорее иди решать задачи! 😃</h2>
      </div>
    </div>
  );
};

export default MainPage;
