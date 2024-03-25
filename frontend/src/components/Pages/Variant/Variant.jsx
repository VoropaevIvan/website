import LeftMenu from "./Variant components/LeftMenu";
import TaskTextForVariant from "./Variant components/TaskTextForVariant";
import VarMenu from "./Variant components/VarMenu";
import InputForAnswer from "./Variant components/InputForAnswer";
import "./Variant.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../redux/slices/variantSlice";
import { createDataForTable } from "../../Utils/addTaskUtils/addTaskUtils";
import TableForAnswer from "./Variant components/TableForAnswer";
import { prepareAnswerFields } from "../../Utils/addTaskUtils/variantUtils";
import { getVariantTasksFromServer } from "../../Utils/addTaskUtils/server";
import { addTypeAnswerField } from "./Variant components/VariantUtils";
import { useLocation } from "react-router-dom";

const Variant = () => {
  const location = useLocation();
  const varData = useSelector((state) => state.variant.data);

  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const curAnswers = useSelector((state) => state.variant.answers);
  const curAnswer = curAnswers[curTaskNumber] ? curAnswers[curTaskNumber] : "";
  const [valueInAnswerInput, setValueInAnswerInput] = useState("");
  const [valueInAnswerTable, setValueInAnswerTable] = useState({
    data: createDataForTable({ cols: 2, rows: 6 }),
    cols: 2,
    rows: 6,
    default: true,
  });

  const [isOkLoad, setIsOkLoad] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const res = getVariantTasksFromServer({
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
      res.then((tasks) => {
        setValueInAnswerTable(
          tasks[0]?.answer.cols !== 0 || tasks[0]?.answer.rows !== 0
            ? {
                tasks: createDataForTable({ cols: 2, rows: 6 }),
                cols: 2,
                rows: 6,
                default: true,
              }
            : {
                tasks: createDataForTable({ cols: 2, rows: 1 }),
                cols: 2,
                rows: 1,
                default: true,
              }
        );
      });
    }
    fetchData();
  }, [dispatch, location]);

  prepareAnswerFields({
    curTaskNumber,
    curAnswers,
    varData,
    setValueInAnswerInput,
    valueInAnswerTable,
    valueInAnswerInput,
    createDataForTable,
    setValueInAnswerTable,
  });

  if (!isOkLoad) {
    return <></>;
  }
  if (varData.length === 0) {
    return <h2>Пустой вариант</h2>;
  }
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
      <div className="varTask">
        <div className="varTaskText enable">
          <TaskTextForVariant />
          {varData &&
            varData[curTaskNumber] &&
            varData[curTaskNumber]["typeAnswer"] &&
            (varData[curTaskNumber]["typeAnswer"] === "table" ||
              varData[curTaskNumber]["typeAnswer"] === "two") && (
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
            )}
        </div>
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
  );
};

export default Variant;
