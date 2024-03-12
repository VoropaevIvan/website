import { useState } from "react";
import "./Task.css";
import Table from "../../Utils/Table/Table";
import { createDataForTable } from "../../Utils/addTaskUtils/addTaskUtils";
import { eraseEmptyRowsFromTable } from "../../Utils/addTaskUtils/variantUtils";

export const Task = ({ id, content, trueAnswer }) => {
  const [isSolved, setIsSolved] = useState({
    decision: false,
    text: "Задача ещё не решена",
  });

  const [userAnswer, setUserAnswer] = useState("");
  if (trueAnswer.rows === 1 && trueAnswer.cols === 2) {
    if (userAnswer === "" || userAnswer.cols !== 2 || userAnswer.rows !== 1) {
      setUserAnswer({
        cols: 2,
        rows: 1,
        data: createDataForTable({ cols: 2, rows: 1 }),
      });
    }
  }
  if (trueAnswer.rows === 0 && trueAnswer.cols === 0) {
    if (userAnswer === "" || userAnswer.cols !== 0 || userAnswer.rows !== 0) {
      setUserAnswer({
        cols: 0,
        rows: 0,
        data: "",
      });
    }
  }
  if (trueAnswer.rows === 2 && trueAnswer.cols === 6) {
    if (userAnswer === "" || userAnswer.cols !== 2 || userAnswer.rows !== 6) {
      setUserAnswer({
        cols: 2,
        rows: 6,
        data: createDataForTable({ cols: 2, rows: 6 }),
      });
    }
  }

  function analyseUserAnswer(answer) {
    console.log(answer);
    console.log(answer.data.toString());
    console.log(trueAnswer.data.toString());

    if ((answer.cols !== 0) | (answer.rows !== 0)) {
      answer = eraseEmptyRowsFromTable(answer);
      if (trueAnswer.data.toString() === answer.data.toString()) {
        setIsSolved({ decision: true, text: "Задача решена верно" });
      } else {
        setIsSolved({ decision: false, text: "Задача решена неправильно" });
      }
    } else {
      if (trueAnswer.data === answer.data) {
        setIsSolved({ decision: true, text: "Задача решена верно" });
      } else {
        setIsSolved({ decision: false, text: "Задача решена неправильно" });
      }
    }
  }

  function handleAnswerSubmit(event) {
    event.preventDefault();
    analyseUserAnswer(userAnswer);
  }

  function createMarkup(myContent) {
    return { __html: myContent };
  }

  const answerInput = () => {
    if (trueAnswer.rows === 0 && trueAnswer.cols === 0) {
      return (
        <input
          style={{ margin: "4px" }}
          value={userAnswer.data}
          onChange={(e) => {
            setUserAnswer({ cols: 0, rows: 0, data: e.target.value });
          }}
          type="text"
        ></input>
      );
    }
    if (trueAnswer.rows === 1 && trueAnswer.cols === 2) {
      if (userAnswer === "" || userAnswer.cols !== 2 || userAnswer.rows !== 1) {
        setUserAnswer({
          cols: 2,
          rows: 1,
          data: createDataForTable({ cols: 2, rows: 1 }),
        });
      }
      return (
        <Table
          rows={1}
          cols={2}
          setAnswer={setUserAnswer}
          data={userAnswer.data}
          disabled={false}
        />
      );
    }
    if (userAnswer === "" || userAnswer.cols !== 2 || userAnswer.rows !== 6) {
      setUserAnswer({
        cols: 2,
        rows: 6,
        data: createDataForTable({ cols: 2, rows: 6 }),
      });
    }

    return userAnswer ? (
      <Table
        rows={6}
        cols={2}
        setAnswer={setUserAnswer}
        data={userAnswer.data}
        disabled={false}
      />
    ) : (
      <p>12345678</p>
    );
  };

  return (
    <div className="task">
      <div dangerouslySetInnerHTML={createMarkup(content)} />
      <br />
      <form onSubmit={handleAnswerSubmit}>
        <label>
          Ваш ответ
          {trueAnswer && answerInput()}
        </label>
        <button style={{ margin: "5px" }} onClick={handleAnswerSubmit}>
          Проверить ответ
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
