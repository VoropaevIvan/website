import LeftMenu from "./Variant components/LeftMenu";
import TaskTextForVariant from "./Variant components/TaskTextForVariant";
import VarMenu from "./Variant components/VarMenu";
import InputForAnswer from "./Variant components/InputForAnswer";
import "./Variant.css";
import { useEffect, useState } from "react";
import getVariantData from "./Variant components/getVariantData";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slices/variantSlice";
import { createDataForTable } from "../Utils/addTaskUtils/addTaskUtils";
import TableForAnswer from "./Variant components/TableForAnswer";
import { prepareAnswerFields } from "../Utils/addTaskUtils/variantUtils";

const Variant = () => {
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
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = getVariantData(1);
      dispatch(setData(data));

      setValueInAnswerTable(
        data[0]?.typeAnswer === "table"
          ? {
              data: createDataForTable({ cols: 2, rows: 6 }),
              cols: 2,
              rows: 6,
              default: true,
            }
          : {
              data: createDataForTable({ cols: 2, rows: 1 }),
              cols: 2,
              rows: 1,
              default: true,
            }
      );
    }
    fetchData();
  }, [dispatch]);

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
