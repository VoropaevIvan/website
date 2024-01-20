import { useState } from "react";

export const Test = () => {
  const [x, setX] = useState("1");

  const handleClick = () => {
    console.log("before", x);
    setX(x + "!");
    console.log("after", x);
  };
  return (
    <>
      <h1>{x}</h1>
      <button onClick={handleClick}>Кнопка</button>
    </>
  );
};
