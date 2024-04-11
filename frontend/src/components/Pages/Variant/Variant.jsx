import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import LeftMenu from "./Variant components/LeftMenu";
import TaskTextForVariant from "./Variant components/TaskTextForVariant";
import VarMenu from "./Variant components/VarMenu";
import InputForAnswer from "./Variant components/InputForAnswer";
import TableContainer from "./Variant components/TableContainer";
import VarFooter from "./Variant components/VarFooter";
import NotFound from "../NotFound";

import {
  clearAnswers,
  setCurrentTask,
  setData,
  setVariantResults,
} from "../../../redux/slices/variantSlice";
import { createDataForTable } from "../../Utils/addTaskUtils/addTaskUtils";
import { getVariantTasksFromServer } from "../../Utils/addTaskUtils/server";
import {
  addTrueAnswer,
  addTypeAnswerField,
  createVarResults,
} from "./Variant components/VariantUtils";

import "./Variant.css";
import { saveVariantOnServer } from "../../server/serverVariant";
import {
  calcFirstBalls,
  firstToTestBalls,
} from "../../Utils/variant/variantUtils";
import {
  eraseStringifyFromData,
  objectToArray,
} from "../../Utils/addTaskUtils/variantUtils";

const Variant = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const varTasks = useSelector((state) => state.variant.data);
  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const curAnswers = useSelector((state) => state.variant.answers);

  const [valueInAnswerInput, setValueInAnswerInput] = useState({
    cols: 0,
    rows: 0,
    data: "",
  });
  const [valueInAnswerTable, setValueInAnswerTable] = useState({});
  const [isOkLoad, setIsOkLoad] = useState(false);
  const [fontScale, setFontScale] = useState(0);

  const varId = location.pathname.split("/").reverse()[0];
  const curAnswer = curAnswers[curTaskNumber]
    ? curAnswers[curTaskNumber]
    : {
        cols: 0,
        rows: 0,
        data: "",
      };

  useEffect(() => {
    async function fetchData() {
      dispatch(clearAnswers());
      getVariantTasksFromServer({
        varId: varId,
        setTasksFromServer: (tasks) => {
          const tasksWithTypeAnswer = tasks.map((task) => {
            return addTypeAnswerField(task);
          });
          dispatch(setData(tasksWithTypeAnswer));
        },
        setTextInEditor: () => {},
        setTextInSolutionEditor: () => {},
        setIsOkLoad: setIsOkLoad,
      });
    }

    fetchData();
  }, [dispatch, location, varId]);

  useEffect(() => {
    if (varTasks[curTaskNumber]) {
      if (curAnswers[curTaskNumber]) {
        if (varTasks[curTaskNumber].typeAnswer === "text") {
          setValueInAnswerInput(curAnswers[curTaskNumber]);
        } else {
          setValueInAnswerTable(curAnswers[curTaskNumber]);
        }
      } else {
        if (varTasks[curTaskNumber].typeAnswer === "text") {
          setValueInAnswerInput({
            cols: 0,
            rows: 0,
            data: "",
          });
        } else if (varTasks[curTaskNumber].typeAnswer === "two") {
          setValueInAnswerTable({
            data: createDataForTable({ cols: 2, rows: 1 }),
            cols: 2,
            rows: 1,
            default: true,
          });
        } else {
          setValueInAnswerTable({
            data: createDataForTable({ cols: 2, rows: 6 }),
            cols: 2,
            rows: 6,
            default: true,
          });
        }
      }
    }
  }, [curTaskNumber, varTasks, curAnswers]);

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "ArrowLeft") {
        if (curTaskNumber > 0) {
          dispatch(setCurrentTask(curTaskNumber - 1));
        }
      }
      if (e.key === "ArrowRight") {
        if (varTasks) {
          if (curTaskNumber + 1 < varTasks.length) {
            dispatch(setCurrentTask(curTaskNumber + 1));
          }
        }
      }
    };

    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [dispatch, curTaskNumber, varTasks]);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const handlePrevTaskBut = () => {
    if (curTaskNumber > 0) {
      dispatch(setCurrentTask(curTaskNumber - 1));
    }
  };
  const handleNextTaskBut = () => {
    if (curTaskNumber + 1 < varTasks.length) {
      dispatch(setCurrentTask(curTaskNumber + 1));
    }
  };

  if (!isOkLoad) {
    return <div className="container"></div>;
  }
  if (varTasks.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="container">
      <div className="varHeader">
        <VarMenu
          saveVariantOnServer={async () => {
            const answersWithBalls = createVarResults({
              answers: curAnswers,
              varTasks: varTasks,
            });

            const firstBalls = calcFirstBalls(answersWithBalls);
            if (localStorage.getItem("jwt")) {
              await saveVariantOnServer({
                variantName: varId,
                answers: answersWithBalls,
                isEGEFormat: true,
                scoresEGE: firstToTestBalls(firstBalls),
                primaryScores: firstBalls,
              });
            } else {
              let answersWithBallsOk = eraseStringifyFromData(answersWithBalls);
              answersWithBallsOk = addTrueAnswer(answersWithBallsOk, varTasks);
              answersWithBallsOk = eraseStringifyFromData(answersWithBallsOk);
              answersWithBallsOk = objectToArray(answersWithBallsOk, varTasks);

              dispatch(
                setVariantResults({
                  variantName: varId,
                  userAnswers: answersWithBallsOk,
                  isEGEFormat: true,
                  scoresEGE: firstToTestBalls(firstBalls),
                  primaryScores: firstBalls,
                })
              );
            }
          }}
        />
      </div>

      <div className="varNavigate">
        <LeftMenu fontScale={fontScale} setFontScale={setFontScale} />
      </div>

      <div className="taskbutdivl">
        <div onClick={handlePrevTaskBut} className="taskbut">
          {"←"}
        </div>
      </div>

      <div className="varTask">
        <div className="varTaskText enable">
          <div className="taskwithbut">
            <TaskTextForVariant fontScale={fontScale} />
          </div>

          {/* Table answer */}
          {varTasks &&
            varTasks[curTaskNumber] &&
            varTasks[curTaskNumber]["typeAnswer"] &&
            (varTasks[curTaskNumber]["typeAnswer"] === "table" ||
              varTasks[curTaskNumber]["typeAnswer"] === "two") && (
              <TableContainer
                valueInAnswerTable={valueInAnswerTable}
                curAnswer={curAnswer}
                curTaskNumber={curTaskNumber}
                setValueInAnswerTable={setValueInAnswerTable}
              />
            )}
        </div>
      </div>

      <div className="taskbutdivr">
        <div onClick={handleNextTaskBut} className="taskbut">
          {"→"}
        </div>
      </div>

      <div className="varfooter">
        <VarFooter
          valueInAnswerInput={valueInAnswerInput}
          varData={varTasks}
          curTaskNumber={curTaskNumber}
          InputForAnswer={InputForAnswer}
          setValueInAnswerInput={setValueInAnswerInput}
        />
      </div>
    </div>
  );
};

export default Variant;
