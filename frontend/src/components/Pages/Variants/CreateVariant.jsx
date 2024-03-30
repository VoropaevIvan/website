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
          const link = process.env.REACT_APP_LINK_VARIANT;
          const res = axios.post(link + newVariantName, [], {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          });

          res.then(() => {
            const link = process.env.REACT_APP_LINK_VARIANTS;
            const res1 = axios.get(link);
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
