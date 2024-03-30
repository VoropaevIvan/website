import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateVariant from "./CreateVariant";
import "./Variants.css";
import { useSelector } from "react-redux";

const Variants = () => {
  const [variantsNames, setVariantsNames] = useState([]);
  const authData = useSelector((state) => state.auth);
  const isAdmin = authData.isAdmin;

  useEffect(() => {
    async function fetchData() {
      const link = process.env.REACT_APP_LINK_VARIANTS;
      const res = axios.get(link);
      res.then((value) => {
        setVariantsNames(value.data);
      });
    }
    fetchData();
  }, []);

  return (
    <div className="variantspage">
      {isAdmin && <CreateVariant setVariantsNames={setVariantsNames} />}
      <div className="header">
        <h1>Доступные варианты</h1>
      </div>

      <div className="variants">
        {variantsNames.map((varName) => {
          return (
            <div key={varName}>
              <Link className="varlink" to={"/variant/" + varName}>
                {varName}
              </Link>{" "}
              {isAdmin && <Link to={"/edit-variant/" + varName}>{"📝"}</Link>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Variants;
