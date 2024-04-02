import TableForAnswer from "./TableForAnswer";
import "./TableContainer.css";

const TableContainer = ({
  valueInAnswerTable,
  curAnswer,
  curTaskNumber,
  setValueInAnswerTable,
}) => {
  return (
    <div className="tableanswercont">
      <div className="tableanswer">
        <p>Введите свой ответ</p>
        <TableForAnswer
          rows={valueInAnswerTable.rows}
          cols={valueInAnswerTable.cols}
          data={valueInAnswerTable.data}
          setNotFinalAnswer={setValueInAnswerTable}
          disabled={(curAnswer.length > 0) | (curAnswer?.data?.length > 0)}
          valueInAnswerTable={valueInAnswerTable}
          curTaskNumber={curTaskNumber}
        />
      </div>
    </div>
  );
};

export default TableContainer;
