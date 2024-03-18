import axios from "axios";
import { useState } from "react";

const Variants = () => {
  const [newVariantName, setNewVariantName] = useState("");

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
          axios.post("http://localhost:8080/variants/" + newVariantName, []);
        }}
      >
        Создать вариант
      </button>
    </>
  );
};

export default Variants;
