import LeftMenu from "./Variant components/LeftMenu";
import TaskTextForVariant from "./Variant components/TaskTextForVariant";
import VarMenu from "./Variant components/VarMenu";
import InputForAnswer from "./Variant components/InputForAnswer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTask, setData } from "../../../redux/slices/variantSlice";
import { createDataForTable } from "../../Utils/addTaskUtils/addTaskUtils";
import TableForAnswer from "./Variant components/TableForAnswer";
import { getVariantTasksFromServer } from "../../Utils/addTaskUtils/server";
import { addTypeAnswerField } from "./Variant components/VariantUtils";
import { useLocation } from "react-router-dom";

import { LiaFileDownloadSolid } from "react-icons/lia";
import "./Variant.css";
import "./Variant components/VarFooter.css";
import { fileImgInVar } from "../constants";

const Variant = () => {
  const location = useLocation();
  const varData = useSelector((state) => state.variant.data);

  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const curAnswers = useSelector((state) => state.variant.answers);
  const curAnswer = curAnswers[curTaskNumber] ? curAnswers[curTaskNumber] : "";
  const [valueInAnswerInput, setValueInAnswerInput] = useState("");
  const [valueInAnswerTable, setValueInAnswerTable] = useState({});

  const [isOkLoad, setIsOkLoad] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      getVariantTasksFromServer({
        varId: location.pathname.split("/").reverse()[0],
        setTasksFromServer: (tasks) => {
          const tasksWithTypeAnswer = tasks.map((task) => {
            return addTypeAnswerField(task);
          });
          dispatch(setData(tasksWithTypeAnswer));
          console.log(tasksWithTypeAnswer);
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
    return <></>;
  }
  if (varData.length === 0) {
    return <h2>Пустой вариант</h2>;
  }

  console.log("vat", valueInAnswerTable);
  return (
    <div className="container">
      <div className="varHeader">
        <VarMenu />
      </div>

      <div className="varNavigate">
        <LeftMenu
          valueInAnswerInput={valueInAnswerInput}
          setValueInAnswerInput={setValueInAnswerInput}
          setValueInAnswerTable={setValueInAnswerTable}
        />
      </div>

      <div className="taskbutdivl">
        <div onClick={handlePrevTaskBut} className="taskbut">
          {"←"}
        </div>
      </div>

      <div className="varTask">
        <div className="varTaskText enable">
          <div className="taskwithbut">
            <TaskTextForVariant />
          </div>

          {varData &&
            varData[curTaskNumber] &&
            varData[curTaskNumber]["typeAnswer"] &&
            (varData[curTaskNumber]["typeAnswer"] === "table" ||
              varData[curTaskNumber]["typeAnswer"] === "two") && (
              <div className="tableanswercont">
                <div className="tableanswer">
                  <p>Введите свой ответ</p>
                  <TableForAnswer
                    rows={valueInAnswerTable.rows}
                    cols={valueInAnswerTable.cols}
                    data={valueInAnswerTable.data}
                    setNotFinalAnswer={setValueInAnswerTable}
                    disabled={
                      (curAnswer.length > 0) | (curAnswer?.data?.length > 0)
                    }
                    valueInAnswerTable={valueInAnswerTable}
                    curAnswer={curAnswer}
                    curTaskNumber={curTaskNumber}
                  />
                </div>
              </div>
            )}
        </div>
      </div>

      <div className="taskbutdivr">
        <div onClick={handleNextTaskBut} className="taskbut">
          {"→"}
        </div>
      </div>

      <div className="varfooter">
        <div className="varfiles">
          {["9.xls", "9.txt", "9.xslx", "9.ods"].map((file, i) => {
            return (
              <div
                onClick={() => {
                  console.log("download");
                }}
                className="fileandimg"
                key={i}
              >
                <LiaFileDownloadSolid className="fileimg" />
                {/* <img alt="" src={fileImgInVar}></img> */}
                {file}
              </div>
            );
          })}
        </div>
        <div className="varAnswer">
          {varData &&
            varData[curTaskNumber] &&
            varData[curTaskNumber]["typeAnswer"] &&
            varData[curTaskNumber]["typeAnswer"] === "text" && (
              <InputForAnswer
                valueInAnswerInput={valueInAnswerInput}
                setValueInAnswerInput={setValueInAnswerInput}
              ></InputForAnswer>
            )}
        </div>
      </div>
    </div>
  );
};

export default Variant;
