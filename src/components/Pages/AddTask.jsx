import axios from "axios";
import { useEffect, useState } from "react";
import TinyEditor from "../Utils/TinyEditor";
import Table from "../Utils/Table/Table";
import "./AddTask.css";

const createDataForTable = ({ cols, rows }) => {
  let initialData = [];
  for (let i = 1; i <= rows; i++) {
    let obj = [];
    for (let j = 1; j <= cols; j++) {
      obj.push("");
    }
    initialData.push(obj);
  }
  return JSON.parse(JSON.stringify(initialData));
};

const getTaskById = async (id, setInitialDataFromServer, setAllTaskData) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/task/${id}`);

    if (res.data) {
      console.log(res.data);
      setInitialDataFromServer(res.data);
      setAllTaskData(res.data);
    }
  } catch (error) {
    //setInitialDataFromServer();
    console.log(error);
  }
};

const whatAnswerType = ({ cols, rows }) => {
  return cols === 0 && rows === 0 ? "Текстовое поле" : "Таблица";
};

const AddTask = () => {
  const [initialDataFromServer, setInitialDataFromServer] = useState({
    text: "Текст",
    answer: { rows: 0, cols: 0, data: "Ответ по дефолту" },
    solution: "",
  });

  const [allTaskData, setAllTaskData] = useState({
    text: "Введите условие задачи",
    answer: { rows: 0, cols: 0, data: "Ответ по дефолту" },
    solution: "Введите решение на задачу",
  });

  const setText = (text) => {
    setAllTaskData({ ...allTaskData, text: text });
  };
  const setSolution = (solution) => {
    setAllTaskData({ ...allTaskData, solution: solution });
  };
  const setAnswer = (answer) => {
    setAllTaskData({
      ...allTaskData,
      answer: answer,
    });
  };
  const setAnswerType = (e) => {
    // setAllTaskData({ ...allTaskData, answer: answer });
    const typeAnswer = e.target.value;
    if (typeAnswer === "Текстовое поле") {
      setAllTaskData({
        ...allTaskData,
        answer: { cols: 0, rows: 0, data: "" },
      });
    } else {
      setAllTaskData({
        ...allTaskData,
        answer: { cols: 2, rows: 1, data: [["", ""]] },
      });
    }
  };
  const setTableSize = ({ number, type }) => {
    if (type === "cols") {
      setAllTaskData({
        ...allTaskData,
        answer: {
          ...allTaskData.answer,
          cols: Number(number),
          data: createDataForTable({
            cols: Number(number),
            rows: allTaskData.answer.rows,
          }),
        },
      });
    } else {
      setAllTaskData({
        ...allTaskData,
        answer: {
          ...allTaskData.answer,
          rows: Number(number),
          data: createDataForTable({
            cols: allTaskData.answer.cols,
            rows: Number(number),
          }),
        },
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      getTaskById(66, setInitialDataFromServer, setAllTaskData);
    }
    fetchData();
  }, []);

  return (
    <div className="addTask">
      <h2>Условие задачи</h2>
      <div className="editor">
        <TinyEditor
          setText={setText}
          initialText={initialDataFromServer.text}
        />
        <h3>{allTaskData.text}</h3>
      </div>
      <div className="answer">
        {/* <label htmlFor="answer">Ответ</label> */}
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

      <details>
        <summary>Текстовое решение задачи</summary>
        <div className="editor">
          <TinyEditor
            setText={setSolution}
            height={350}
            initialText={initialDataFromServer.solution}
          />
          <h3>{allTaskData.solution}</h3>
        </div>
      </details>
    </div>
  );
};

export default AddTask;
