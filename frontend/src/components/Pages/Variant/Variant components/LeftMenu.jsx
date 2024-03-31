import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { setCurrentTask } from "../../../../redux/slices/variantSlice";

import "./LeftMenu.css";

function LeftMenu({ setValueInAnswerInput, setValueInAnswerTable }) {
  const curTask = useSelector((state) => state.variant.currentTask);
  const varData = useSelector((state) => state.variant.data);
  const curAnswers = useSelector((state) => state.variant.answers);

  const dispatch = useDispatch();
  const divRef = useRef(null);

  const handleScrollUp = () => {
    divRef.current.scrollBy(0, -200);
  };

  const handleScrollDown = () => {
    divRef.current.scrollBy(0, 200);
  };

  const countUserAns = (curAnswers) => {
    let count = 0;
    for (let i = 0; i < varData.length; i++) {
      if (curAnswers[i]) {
        count++;
      }
    }
    return count;
  };
  return (
    <div className="leftmenu">
      <div>
        <div className="lmheader">{"Дано ответов"}</div>
        <div className="lmcount">{countUserAns(curAnswers) + " / 27"}</div>
      </div>

      <button className="scrollbut" onClick={handleScrollUp}>
        ↑
      </button>

      <div ref={divRef} className="leftmenubuttons">
        {varData &&
          varData.map((e, num) => {
            return (
              <button
                onClick={() => {
                  dispatch(setCurrentTask(num));
                }}
                key={num}
                className={
                  "leftmenubutton" +
                  (curAnswers[num] ? " withans" : " ") +
                  (String(num) === String(curTask) ? " activevartask" : "")
                }
              >
                {num + 1}
              </button>
            );
          })}
      </div>
      <button className="scrollbut" onClick={handleScrollDown}>
        ↓
      </button>
    </div>
  );
}

export default LeftMenu;
