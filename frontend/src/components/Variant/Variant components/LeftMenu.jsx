import { useRef } from "react";
import "./LeftMenu.css";

function LeftMenu() {
  const divRef = useRef(null);

  const nums = [];
  for (let index = 0; index < 28; index++) {
    nums.push(index);
  }
  console.log(nums);

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
        {nums.map((num) => {
          return (
            <button key={num} className="leftmenubutton">
              {num}
            </button>
          );
        })}
      </div>
      <button onClick={handleScrollDown}>down</button>
    </>
  );
}

export default LeftMenu;
