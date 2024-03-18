import axios from "axios";
import { useEffect, useState } from "react";

const Variants = () => {
  const [newVariantName, setNewVariantName] = useState("");
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
  return (
    <>
      <input
        value={newVariantName}
        onChange={(e) => {
          setNewVariantName(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          const res = axios.post(
            "http://localhost:8080/variants/" + newVariantName,
            []
          );

          res.then(() => {
            const res1 = axios.get("http://localhost:8080/variants");
            res1.then((value) => {
              setVariantsNames(value.data);
            });
          });
        }}
      >
        Создать вариант
      </button>
      <div>
        <ol>
          {variantsNames.map((varName) => {
            return (
              <li key={varName}>
                {"Редактировать: "}
                <a href={"http://localhost:3000/edit-variant/" + varName}>
                  {varName}
                </a>{" "}
                <a href={"http://localhost:3000/variant/" + varName}>
                  {"Открыть"}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default Variants;
