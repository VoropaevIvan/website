import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { setCurrentTask } from "../../../../redux/slices/variantSlice";

import "./LeftMenu.css";

function LeftMenu({ setValueInAnswerInput, setValueInAnswerTable }) {
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

  return (
    <div className="leftmenu">
      <div>
        <div className="lmheader">{"Дано ответов"}</div>
        <div className="lmcount">{"0 / 27"}</div>
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
