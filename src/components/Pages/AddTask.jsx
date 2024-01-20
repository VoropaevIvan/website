import { useState } from "react";
import TinyEditor from "../NotUsed/Editor";

const AddTask = () => {
  const [text1, setText1] = useState("1");
  const [text2, setText2] = useState("2");

  return (
    <div>
      <div
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
        }}
      >
        <TinyEditor setText={setText1} />
        <h3>{text1}</h3>
      </div>

      <div
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
        }}
      >
        <TinyEditor setText={setText2} />
        <h3>{text2}</h3>
      </div>
    </div>
  );
};

export default AddTask;
