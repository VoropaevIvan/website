import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import "./LeftMenu.css";
import { setCurrentTask } from "../../../redux/slices/variantSlice";

function LeftMenu({ valueInAnswerInput, setValueInAnswerInput }) {
  const curAnswers = useSelector((state) => state.variant.answers);
  const curTask = useSelector((state) => state.variant.currentTask);
  const varData = useSelector((state) => state.variant.data);

  const dispatch = useDispatch();
  const divRef = useRef(null);

  // const nums = [];
  // for (let index = 0; index < 28; index++) {
  //   nums.push(index);
  // }

  const handleScrollUp = () => {
    divRef.current.scrollBy(0, -200);
  };

  const handleScrollDown = () => {
    divRef.current.scrollBy(0, 200);
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
                  const newAns = curAnswers[num];
                  if (newAns) {
                    setValueInAnswerInput(curAnswers[num]);
                  } else {
                    setValueInAnswerInput("");
                  }
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
