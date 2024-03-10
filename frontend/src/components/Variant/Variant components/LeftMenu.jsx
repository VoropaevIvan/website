import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import "./LeftMenu.css";
import { setCurrentTask } from "../../../redux/slices/variantSlice";
import { createDataForTable } from "../../Utils/addTaskUtils/addTaskUtils";

function LeftMenu({ setValueInAnswerInput, setValueInAnswerTable }) {
  const curAnswers = useSelector((state) => state.variant.answers);
  const curTask = useSelector((state) => state.variant.currentTask);
  const varData = useSelector((state) => state.variant.data);

  const dispatch = useDispatch();
  const divRef = useRef(null);

  const handleScrollUp = () => {
    divRef.current.scrollBy(0, -200);
  };

  const handleScrollDown = () => {
    divRef.current.scrollBy(0, 200);
  };

  const createTable = (num) => {
    if (varData[num]["typeAnswer"] === "table") {
      return {
        data: createDataForTable({ cols: 2, rows: 6 }),
        cols: 2,
        rows: 6,
      };
    }
    if (varData[num]["typeAnswer"] === "two") {
      return {
        data: createDataForTable({ cols: 2, rows: 1 }),
        cols: 2,
        rows: 1,
      };
    }
  };

  const goToAnotherTask = (num) => {
    const newAns = curAnswers[num];
    if (newAns) {
      if (varData[num].typeAnswer === "text") {
        setValueInAnswerInput(curAnswers[num]);
        setValueInAnswerTable(createTable(num));
      } else {
        setValueInAnswerTable(curAnswers[num]);
        setValueInAnswerInput("");
      }
    } else {
      setValueInAnswerInput("");
      setValueInAnswerTable(createTable(num));
    }
  };

  return (
    <>
      <button onClick={handleScrollUp}>up</button>

      <div ref={divRef} className="leftmenubuttons">
        {varData &&
          varData.map((e, num) => {
            return (
              <button
                onClick={() => {
                  goToAnotherTask(num);
                  dispatch(setCurrentTask(num));
                }}
                key={num}
                className={
                  "leftmenubutton" +
                  (String(num) === String(curTask) ? " activevartask" : "")
                }
              >
                {num + 1}
              </button>
            );
          })}
      </div>
      <button onClick={handleScrollDown}>down</button>
    </>
  );
}

export default LeftMenu;
