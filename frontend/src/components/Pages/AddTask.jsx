import axios from "axios";
import { useEffect, useState } from "react";
import TinyEditor from "../Utils/TinyEditor";
import Table from "../Utils/Table/Table";
import FileView from "../Utils/FileView";
import "./AddTask.css";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const [initialDataFromServer, setInitialDataFromServer] = useState({
    text: "Текст",
    answer: { rows: 0, cols: 0, data: "Ответ по дефолту" },
    solution: "",
    videorazbor: "",
    numberEGE: "№ 1",
    author: "EGE 2023",
  });

  const [allTaskData, setAllTaskData] = useState({
    text: "Введите условие задачи",
    answer: { rows: 0, cols: 0, data: "Ответ по дефолту" },
    solution: "Введите решение на задачу",
    videorazbor: "",
    numberEGE: "№ 1",
    author: "EGE 2023",
  });

  const [isSend, setIsSend] = useState(false);

  const [currentFile, setCurrentFile] = useState(null);
  const [files, setFiles] = useState([]);

  const setText = (text) => {
    setAllTaskData({ ...allTaskData, text: text });
    setIsSend(false);
  };
  const setSolution = (solution) => {
    setAllTaskData({ ...allTaskData, solution: solution });
    setIsSend(false);
  };
  const setAnswer = (answer) => {
    setAllTaskData({
      ...allTaskData,
      answer: answer,
    });
    setIsSend(false);
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
    setIsSend(false);
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
    setIsSend(false);
  };
  const handleSendButton = async () => {
    try {
      console.log(allTaskData);
      const res = await axios.post(`http://localhost:5000/api/addtask/`, {
        ...allTaskData,
        number_ege: 1,
      });
      if (res.status === 200) {
        // alert("ok");
        setIsSend(true);
        navigate("./123", { relative: "path" });
      }
    } catch (error) {
      //setInitialDataFromServer();
      console.log(error);
      alert("Произошла ошибка", error);
    }
  };

  const saveFileOnServer = () => {
    // Send to server...

    setFiles([...files, `file_${files.length}.txt`]);
  };
  const delFile = (fileName) => {
    setFiles(
      files.filter((file) => {
        return file !== fileName;
      })
    );
  };

  useEffect(() => {
    async function fetchData() {
      getTaskById(66, setInitialDataFromServer, setAllTaskData);
    }
    fetchData();
    console.log("fetch");
  }, [location]);

  return (
    <div className="addTask">
      <span>
        <p>
          {"Номер ЕГЭ "}

          <select
            onChange={(e) => {
              setAllTaskData({ ...allTaskData, numberEGE: e.target.value });
            }}
            value={allTaskData.numberEGE}
          >
            {[
              "№ 1",
              "№ 2",
              "№ 3",
              "№ 4",
              "№ 5",
              "№ 6",
              "№ 7",
              "№ 8",
              "№ 9",
              "№ 10",
              "№ 11",
              "№ 12",
              "№ 13",
              "№ 14",
              "№ 15",
              "№ 16",
              "№ 17",
              "№ 18",
              "№ 19-21",
              "№ 22",
              "№ 23",
              "№ 24",
              "№ 25",
              "№ 26",
              "№ 27",
            ].map((s) => {
              return <option key={s}>{s}</option>;
            })}
          </select>
        </p>
      </span>
      <span>
        {"Откуда задача "}
        <input
          value={allTaskData.author}
          onChange={(e) => {
            setAllTaskData({ ...allTaskData, author: e.target.value });
          }}
        ></input>
      </span>
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
      <div className="videorazbor">
        <span>
          Видеоразбор
          <input
            value={allTaskData.videorazbor}
            onChange={(e) => {
              setAllTaskData({ ...allTaskData, videorazbor: e.target.value });
            }}
          ></input>
        </span>
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
      <div>
        <input
          type="file"
          onChange={(e) => {
            setCurrentFile(e.target.files[0]);
          }}
        ></input>
        <button onClick={saveFileOnServer}>Отправить</button>
        <br></br>
        {files.map((file) => {
          return <FileView key={file} fileName={file} delFile={delFile} />;
        })}
      </div>
      <span>
        <button className="sendButton" onClick={handleSendButton}>
          Сохранить
        </button>
        {isSend && <strong>Задача сохранена</strong>}
      </span>
    </div>
  );
};

export default AddTask;
