import { useDispatch } from "react-redux";
import { clearAnswer, setAnswer } from "../../../../redux/slices/variantSlice";
import Table from "../../../Utils/Table/Table";
import { createDataForTable } from "../../../Utils/addTaskUtils/addTaskUtils";

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
        <button className="clearbutton" onClick={handleClearAnswerButtonClick}>
          Очистить
        </button>
        <button
          className="savebutton"
          onClick={handleSaveButtonClick}
          disabled={disabled}
        >
          Сохранить ответ
        </button>
      </div>
    </>
  );
};
export default TableForAnswer;
