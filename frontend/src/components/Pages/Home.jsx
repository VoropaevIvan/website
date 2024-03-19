import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useEffect } from "react";

const Home = () => {
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

  return <h1>Главная страница</h1>;
};

export default Home;
