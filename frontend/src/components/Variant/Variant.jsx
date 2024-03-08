import LeftMenu from "./Variant components/LeftMenu";
import TaskTextForVariant from "./Variant components/TaskTextForVariant";
import VarMenu from "./Variant components/VarMenu";
import InputForAnswer from "./Variant components/InputForAnswer";
import "./Variant.css";
import { useState } from "react";

const Variant = () => {
  const [valueInAnswerInput, setValueInAnswerInput] = useState("");
  return (
    <div className="container">
      <div className="varHeader">
        <VarMenu />
      </div>
      <div className="varNavigate">
        <LeftMenu
          valueInAnswerInput={valueInAnswerInput}
          setValueInAnswerInput={setValueInAnswerInput}
        />
      </div>
      <div className="varTask">
        <div className="varTaskText enable">
          <TaskTextForVariant />
        </div>
      </div>
      <div className="varAnswer">
        <InputForAnswer
          valueInAnswerInput={valueInAnswerInput}
          setValueInAnswerInput={setValueInAnswerInput}
        ></InputForAnswer>
      </div>
    </div>
  );
};

export default Variant;
