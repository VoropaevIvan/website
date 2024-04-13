import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import TopUsers from "./components/TopUsers";
import { getTokenByVkId } from "../../server/serverAuth";
import { useDispatch } from "react-redux";
import { setHasToken } from "../../../redux/slices/authSlice";

import "./MainPage.css";

import Highlight from "react-highlight";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const parsed = queryString.parse(location.search);
      if (parsed?.payload) {
        const payload = JSON.parse(parsed.payload);
        if (payload) {
          const data = await getTokenByVkId({
            silentToken: payload.token,
            uuid: payload.uuid,
          });

          try {
            localStorage.setItem("jwt", data.data);
            dispatch(setHasToken(true));
            navigate("./", { relative: "path" });
          } catch (error) {}
        }
      }
    }

    fetchData();
  }, [location, navigate, dispatch]);

  return (
    <div className="mainpage">
      <TopUsers />

      <div>
        <h2
          className="gowork"
          onClick={() => {
            navigate("/bank");
          }}
        >
          Скорее иди решать задачи! 😃
        </h2>
      </div>
    </div>
  );
};

export default MainPage;
