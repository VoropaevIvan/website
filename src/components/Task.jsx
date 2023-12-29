import { useState } from "react";

export const Task = ({ id, text, trueAnswer }) => {
  trueAnswer = String(trueAnswer);
  const [isSolved, setIsSolved] = useState("Не было решения");

  const [userAnswer, setUserAnswer] = useState("");

  function analyseUserAnswer(answer) {
    if (trueAnswer === answer) {
      setIsSolved("Задача решена верно");
    } else {
      setIsSolved("Задача решена неправильно");
    }
  }

  function handleAnswerSubmit(event) {
    event.preventDefault();
    analyseUserAnswer(userAnswer);
  }
  return (
    <div>
      {text}
      <br />
      <form onSubmit={handleAnswerSubmit}>
        <label>
          Ваш ответ
          <input
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
            }}
            type="text"
          ></input>
        </label>
      </form>
      <button onClick={handleAnswerSubmit}>Отправить ответ</button>
      <h3>{isSolved}</h3>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Task;
