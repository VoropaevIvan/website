import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentTask } from "../../../../redux/slices/variantSlice";

import { countUserAns } from "../../../Utils/variant/variantUtils";

import { SlMagnifierAdd } from "react-icons/sl";
import { SlMagnifierRemove } from "react-icons/sl";
import "./LeftMenu.css";

function LeftMenu({ fontScale, setFontScale }) {
  const divRef = useRef(null);
  const dispatch = useDispatch();

  const curTask = useSelector((state) => state.variant.currentTask);
  const varData = useSelector((state) => state.variant.data);
  const curAnswers = useSelector((state) => state.variant.answers);

  const handleScrollUp = () => {
    divRef.current.scrollBy(0, -200);
  };
  const handleScrollDown = () => {
    divRef.current.scrollBy(0, 200);
  };

  const handleFontUp = () => {
    if (fontScale < 0.5) {
      setFontScale(fontScale + 0.05);
    }
  };
  const handleFontDown = () => {
    if (fontScale > -0.5) {
      setFontScale(fontScale - 0.05);
    }
  };

  return (
    <div className="leftmenu">
      <div>
        <div className="lmheader">{"Дано ответов"}</div>
        <div className="lmcount">
          {countUserAns(curAnswers, varData.length) + " / 27"}
        </div>
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

      <button className="leftmenubutton" onClick={handleFontUp}>
        <SlMagnifierAdd />
      </button>
      <button className="leftmenubutton" onClick={handleFontDown}>
        <SlMagnifierRemove />
      </button>
    </div>
  );
}

export default LeftMenu;
