import { useState } from "react";
import {
  createVariantByName,
  getAllVariants,
} from "../../server/serverVariant";

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
        onClick={async () => {
          const res1 = await createVariantByName({ newVariantName });
          const res2 = await getAllVariants();

          setVariantsNames(res2.data);
          setNewVariantName("");
        }}
      >
        Создать вариант
      </button>
    </div>
  );
};

export default CreateVariant;
