import { useDispatch } from "react-redux";

import { clearAnswer, setAnswer } from "../../../../redux/slices/variantSlice";
import { createDataForTable } from "../../../Utils/addTaskUtils/addTaskUtils";
import Table from "../../../Utils/Table/Table";

import "./TableForAnswer.css";
import { emptyAnswerTable } from "../../../Utils/variant/variantUtils";

const TableForAnswer = ({
  rows,
  cols,
  data,
  setNotFinalAnswer,
  disabled,
  valueInAnswerTable,
  curTaskNumber,
}) => {
  const dispatch = useDispatch();

  const disabledSaveBut = disabled | emptyAnswerTable(valueInAnswerTable);

  const handleSaveButtonClick = () => {
    dispatch(
      setAnswer({ taskNumber: curTaskNumber, newAnswer: valueInAnswerTable })
    );
  };

  const handleClearAnswerButtonClick = () => {
    dispatch(clearAnswer(curTaskNumber));
    setNotFinalAnswer({
      data: createDataForTable({ cols: cols, rows: rows }),
      cols: cols,
      rows: rows,
    });
  };

  return (
    <>
      <div className="tablediv">
        <Table
          rows={rows}
          cols={cols}
          data={data}
          setAnswer={setNotFinalAnswer}
          disabled={disabled}
        />
      </div>

      <div className="clearsavebuttons">
        <button
          className={
            emptyAnswerTable(valueInAnswerTable)
              ? "tclearbuttondis"
              : "tclearbutton"
          }
          disabled={emptyAnswerTable(valueInAnswerTable)}
          onClick={handleClearAnswerButtonClick}
        >
          Очистить
        </button>
        <button
          className={disabledSaveBut ? "tsavebuttondis" : "tsavebutton"}
          onClick={handleSaveButtonClick}
          disabled={disabledSaveBut}
        >
          {disabled ? "Ответ сохранён" : "Сохранить ответ"}
        </button>
      </div>
    </>
  );
};
export default TableForAnswer;
