import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Table from "../../../Utils/Table/Table";
import { createDataForTable } from "../../../Utils/addTaskUtils/addTaskUtils";
import { eraseEmptyRowsFromTable } from "../../../Utils/addTaskUtils/variantUtils";
import {
  FIRST_TRY_RIGHT,
  NOT_DONE_TASK,
  OK_DONE_TASK,
  RIGHT,
  WA_DONE_TASK,
  WRONG,
} from "./constantsTask";
import { sendSolve } from "../../../server/serverBank";
import { MdModeEdit } from "react-icons/md";

import "./Task.css";

import Highlight from "react-highlight";

export const Task = ({
  id,
  content,
  trueAnswer,
  numberEGE,
  isOfficial,
  actuality,
  difficulty,
  files,
  solvedStatus,
  solvedCount,
  solvedFirstTryCount,
}) => {
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth);
  const { isAdmin } = authData;

  const [isSolved, setIsSolved] = useState({
    decision: false,
    text: NOT_DONE_TASK,
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

  // Replace
  function analyseUserAnswer(answer) {
    if ((answer.cols !== 0) | (answer.rows !== 0)) {
      answer = eraseEmptyRowsFromTable(answer);
      if (trueAnswer.data.toString() === answer.data.toString()) {
        setIsSolved({ decision: true, text: OK_DONE_TASK });
        if (localStorage.getItem("jwt")) {
          sendSolve({
            taskId: id,
            isRight: true,
            answer: {
              userAnswer: { ...answer, data: JSON.stringify(answer.data) },
              scores: 1,
            },
          });
        }
      } else {
        setIsSolved({ decision: false, text: WA_DONE_TASK });
        if (localStorage.getItem("jwt")) {
          sendSolve({
            taskId: id,
            isRight: false,
            answer: {
              userAnswer: { ...answer, data: JSON.stringify(answer.data) },
              scores: 0,
            },
          });
        }
      }
    } else {
      if (trueAnswer.data === answer.data) {
        setIsSolved({ decision: true, text: OK_DONE_TASK });
        if (localStorage.getItem("jwt")) {
          sendSolve({
            taskId: id,
            isRight: true,
            answer: { userAnswer: answer, scores: 1 },
          });
        }
      } else {
        setIsSolved({ decision: false, text: WA_DONE_TASK });
        if (localStorage.getItem("jwt")) {
          sendSolve({
            taskId: id,
            isRight: false,
            answer: { userAnswer: answer, scores: 0 },
          });
        }
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
          className="answerinbanktext"
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
      <></>
    );
  };
  console.log(createMarkup(content));
  return (
    <div
      className={
        "task " +
        (isSolved.text === NOT_DONE_TASK
          ? (solvedStatus === WRONG ? "WA " : " ") +
            (solvedStatus === RIGHT ? "OK " : " ") +
            (solvedStatus === FIRST_TRY_RIGHT ? "OKFT " : " ")
          : (isSolved.text === OK_DONE_TASK ? "OK " : " ") +
            (isSolved.text === WA_DONE_TASK ? "WA " : " "))
      }
    >
      <div className="taskinfo">
        <p>
          <strong>{numberEGE}</strong>
          <span>{" (" + id + ") "}</span>
          {isAdmin && (
            <MdModeEdit
              className="editbut"
              onClick={() => {
                navigate("../edit-task/" + id, { relative: "path" });
              }}
            />
          )}
        </p>

        <span>{isOfficial ? "Официальная" : "Не официальная"}</span>
        <span>{", " + actuality}</span>
        <span>{", " + difficulty}</span>
        <p>
          Решили: {solvedCount} (
          {solvedFirstTryCount > 0
            ? Math.round((solvedFirstTryCount / solvedCount) * 100)
            : 0}
          %)
        </p>
      </div>

      <hr></hr>

      <div
        className="taskcontent"
        //dangerouslySetInnerHTML={createMarkup(content)}
      >
        <Highlight className="language-python" innerHTML={true}>
          {content}
        </Highlight>
      </div>

      {files && files.length > 0 && (
        <div className="files">
          {files.map((file, i) => {
            return (
              <a key={i} href={file}>
                {"Файл "}
              </a>
            );
          })}
        </div>
      )}

      <hr></hr>

      <div className="answerinbank">
        <form>
          {trueAnswer && answerInput()}
          <button onClick={handleAnswerSubmit}>Проверить ответ</button>
        </form>
      </div>
    </div>
  );
};

export default Task;
