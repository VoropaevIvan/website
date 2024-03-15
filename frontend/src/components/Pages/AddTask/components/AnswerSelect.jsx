import Table from "../../../Utils/Table/Table";
import {
  getAnswerType,
  getTableSize,
  whatAnswerType,
} from "../../../Utils/addTaskUtils/addTaskUtils";

const AnswerSelect = ({ allTaskData, setAllTaskData, setIsSend }) => {
  const setAnswer = (answer) => {
    setAllTaskData({
      ...allTaskData,
      answer: answer,
    });
    setIsSend(false);
  };

  const setTableSize = ({ number, type }) => {
    setAllTaskData(getTableSize({ number, type, allTaskData }));
    setIsSend(false);
  };

  const setAnswerType = (e) => {
    const typeAnswer = e.target.value;
    setAllTaskData({
      ...allTaskData,
      answer: getAnswerType(typeAnswer),
    });
    setIsSend(false);
  };

  return (
    <div className="answer">
      <h3>Ответ</h3>
      <select
        onChange={setAnswerType}
        value={whatAnswerType(allTaskData.answer)}
      >
        <option>Текстовое поле</option>
        <option>Таблица</option>
      </select>
      {allTaskData.answer.cols === 0 && allTaskData.answer.rows === 0 ? (
        <input
          type="text"
          value={allTaskData.answer.data}
          onChange={(e) =>
            setAllTaskData({
              ...allTaskData,
              answer: { rows: 0, cols: 0, data: e.target.value },
            })
          }
        ></input>
      ) : (
        <div>
          <span>
            Количество строк
            <input
              value={allTaskData.answer.rows}
              onChange={(e) => {
                setTableSize({ type: "rows", number: e.target.value });
              }}
            ></input>
            <br></br>
          </span>
          <span>
            Количество столбцов
            <input
              value={allTaskData.answer.cols}
              onChange={(e) => {
                setTableSize({ type: "cols", number: e.target.value });
              }}
            ></input>
          </span>
          <Table
            rows={allTaskData.answer.rows}
            cols={allTaskData.answer.cols}
            setAnswer={setAnswer}
            data={allTaskData.answer.data}
          />
        </div>
      )}
    </div>
  );
};
export default AnswerSelect;
