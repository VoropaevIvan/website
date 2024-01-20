import { useState } from "react";

export const Task = ({ id, text, trueAnswer }) => {
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
    <div style={{ border: "1px solid black", margin: "40px", padding: "10px" }}>
      <div dangerouslySetInnerHTML={createMarkup(text)} />
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
