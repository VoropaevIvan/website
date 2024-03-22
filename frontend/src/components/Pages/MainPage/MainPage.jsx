import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useEffect } from "react";
import "./MainPage.css";
import TopUsers from "./components/TopUsers";
import { getTokenByVkId } from "../../server/serverAuth";
import { useDispatch, useSelector } from "react-redux";
import { setHasToken } from "../../../redux/slices/authSlice";

const MainPage = () => {
  const authData = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const parsed = queryString.parse(location.search);
      if (parsed?.payload) {
        const payload = JSON.parse(parsed.payload);
        if (payload) {
          getTokenByVkId({
            silentToken: payload.token,
            uuid: payload.uuid,
          }).then((data) => {
            localStorage.setItem("jwt", data.data);
            dispatch(setHasToken(true));
            navigate("./", { relative: "path" });
          });
        }
      }
    }

    fetchData();
  }, [location, navigate, dispatch]);

  const jwt = localStorage.getItem("jwt");
  const name = authData.name;
  return (
    <div className="mainpage">
      {/* <div>
        <p>{jwt ? jwt : "токена нет"}</p>
        <p>{name ? name : "имени нет"}</p>
      </div> */}

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
