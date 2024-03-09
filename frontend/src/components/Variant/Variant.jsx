import LeftMenu from "./Variant components/LeftMenu";
import TaskTextForVariant from "./Variant components/TaskTextForVariant";
import VarMenu from "./Variant components/VarMenu";
import InputForAnswer from "./Variant components/InputForAnswer";
import "./Variant.css";
import { useEffect, useState } from "react";
import getVariantData from "./Variant components/getVariantData";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/slices/variantSlice";

const Variant = () => {
  const [valueInAnswerInput, setValueInAnswerInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = getVariantData(1);
      dispatch(setData(data));
    }
    fetchData();
  }, [dispatch]);

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
