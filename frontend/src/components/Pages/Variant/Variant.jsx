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

import { setCurrentTask, setData } from "../../../redux/slices/variantSlice";
import { createDataForTable } from "../../Utils/addTaskUtils/addTaskUtils";
import { getVariantTasksFromServer } from "../../Utils/addTaskUtils/server";
import { addTypeAnswerField } from "./Variant components/VariantUtils";

import "./Variant.css";

const Variant = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const varData = useSelector((state) => state.variant.data);
  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const curAnswers = useSelector((state) => state.variant.answers);

  const [valueInAnswerInput, setValueInAnswerInput] = useState("");
  const [valueInAnswerTable, setValueInAnswerTable] = useState({});
  const [isOkLoad, setIsOkLoad] = useState(false);
  const [fontScale, setFontScale] = useState(0);

  const curAnswer = curAnswers[curTaskNumber] ? curAnswers[curTaskNumber] : "";

  useEffect(() => {
    async function fetchData() {
      getVariantTasksFromServer({
        varId: location.pathname.split("/").reverse()[0],
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
  }, [dispatch, location]);

  useEffect(() => {
    if (varData[curTaskNumber]) {
      if (curAnswers[curTaskNumber]) {
        if (varData[curTaskNumber].typeAnswer === "text") {
          setValueInAnswerInput(curAnswers[curTaskNumber]);
        } else {
          setValueInAnswerTable(curAnswers[curTaskNumber]);
        }
      } else {
        if (varData[curTaskNumber].typeAnswer === "text") {
          setValueInAnswerInput("");
        } else if (varData[curTaskNumber].typeAnswer === "two") {
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
  }, [curTaskNumber, varData, curAnswers]);

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "ArrowLeft") {
        if (curTaskNumber > 0) {
          dispatch(setCurrentTask(curTaskNumber - 1));
        }
      }
      if (e.key === "ArrowRight") {
        if (varData) {
          if (curTaskNumber + 1 < varData.length) {
            dispatch(setCurrentTask(curTaskNumber + 1));
          }
        }
      }
    };

    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [dispatch, curTaskNumber, varData]);

  const handlePrevTaskBut = () => {
    if (curTaskNumber > 0) {
      dispatch(setCurrentTask(curTaskNumber - 1));
    }
  };
  const handleNextTaskBut = () => {
    if (curTaskNumber + 1 < varData.length) {
      dispatch(setCurrentTask(curTaskNumber + 1));
    }
  };

  if (!isOkLoad) {
    return <NotFound />;
  }
  if (varData.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="container">
      <div className="varHeader">
        <VarMenu />
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
          {varData &&
            varData[curTaskNumber] &&
            varData[curTaskNumber]["typeAnswer"] &&
            (varData[curTaskNumber]["typeAnswer"] === "table" ||
              varData[curTaskNumber]["typeAnswer"] === "two") && (
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
          varData={varData}
          curTaskNumber={curTaskNumber}
          InputForAnswer={InputForAnswer}
          setValueInAnswerInput={setValueInAnswerInput}
        />
      </div>
    </div>
  );
};

export default Variant;
