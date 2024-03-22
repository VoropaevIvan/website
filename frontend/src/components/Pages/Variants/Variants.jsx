import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateVariant from "./CreateVariant";
import "./Variants.css";

const Variants = () => {
  const [variantsNames, setVariantsNames] = useState([]);

  useEffect(() => {
    async function fetchData(varId) {
      const res = axios.get("http://localhost:8080/variants");
      res.then((value) => {
        setVariantsNames(value.data);
      });
    }
    fetchData();
  }, []);

  const isAdmin = true;
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
