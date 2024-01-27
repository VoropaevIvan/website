import { useState } from "react";
import "./Task.css";

export const Task = ({ id, content, trueAnswer }) => {
  trueAnswer = String(trueAnswer);
  const [isSolved, setIsSolved] = useState({
    decision: false,
    text: "Задача ещё не решена",
  });

  const [userAnswer, setUserAnswer] = useState("");

  function analyseUserAnswer(answer) {
    if (trueAnswer === answer) {
      setIsSolved({ decision: true, text: "Задача решена верно" });
    } else {
      setIsSolved({ decision: false, text: "Задача решена неправильно" });
    }
  }

  function handleAnswerSubmit(event) {
    event.preventDefault();
    analyseUserAnswer(userAnswer);
  }

  function createMarkup(myContent) {
    return { __html: myContent };
  }

  return (
    <div className="task">
      <div dangerouslySetInnerHTML={createMarkup(content)} />
      <br />
      <form onSubmit={handleAnswerSubmit}>
        <label>
          Ваш ответ
          <input
            style={{ margin: "4px" }}
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
            }}
            type="text"
          ></input>
        </label>
        <button style={{ margin: "5px" }} onClick={handleAnswerSubmit}>
          Отправить ответ
        </button>
      </form>

      <h3
        style={
          isSolved.decision
            ? { backgroundColor: "green" }
            : { backgroundColor: "grey" }
        }
      >
        {isSolved.text}
      </h3>
    </div>
  );
};

export default Task;
