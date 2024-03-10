import { useDispatch } from "react-redux";
import { clearAnswer, setAnswer } from "../../../redux/slices/variantSlice";
import Table from "../../Utils/Table/Table";
import { createDataForTable } from "../../Utils/addTaskUtils/addTaskUtils";

const TableForAnswer = ({
  rows,
  cols,
  data,
  setNotFinalAnswer,
  disabled,
  valueInAnswerTable,
  curAnswer,
  curTaskNumber,
}) => {
  const dispatch = useDispatch();
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
      <Table
        rows={rows}
        cols={cols}
        data={data}
        setAnswer={setNotFinalAnswer}
        disabled={disabled}
      />
      <button onClick={handleSaveButtonClick} disabled={disabled}>
        Сохранить ответ
      </button>
      <button onClick={handleClearAnswerButtonClick}>Очистить</button>
    </>
  );
};
export default TableForAnswer;
