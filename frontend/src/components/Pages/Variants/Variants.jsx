import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import CreateVariant from "./CreateVariant";
import { getAllVariants } from "../../server/serverVariant";

import "./Variants.css";

const Variants = () => {
  const [variantsNames, setVariantsNames] = useState([]);
  const authData = useSelector((state) => state.auth);
  const isAdmin = authData.isAdmin;

  useEffect(() => {
    async function fetchData() {
      const variants = await getAllVariants();
      setVariantsNames(variants);
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
        {variantsNames &&
          variantsNames.map((varName) => {
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
