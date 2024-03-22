import axios from "axios";
import { useState } from "react";

const CreateVariant = ({ setVariantsNames }) => {
  const [newVariantName, setNewVariantName] = useState("");
  return (
    <div className="createnewvariant">
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
            [],
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
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
    </div>
  );
};

export default CreateVariant;
