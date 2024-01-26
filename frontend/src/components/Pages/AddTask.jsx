import axios from "axios";
import { useEffect, useState } from "react";
import TinyEditor from "../Utils/TinyEditor";
import Table from "../Utils/Table/Table";
import FileView from "../Utils/FileView";
import { useLocation, useNavigate } from "react-router-dom";
import {
  whatAnswerType,
  getAnswerType,
  getTableSize,
} from "../Utils/addTaskUtils/addTaskUtils";
import { getTaskById } from "../Utils/addTaskUtils/server";
import "./AddTask.css";

const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const [initialDataFromServer, setInitialDataFromServer] = useState({
    content: "Текст",
    answer: { rows: 0, cols: 0, data: "Ответ по дефолту" },
    solution: "",
    videorazbor: "",
    numberEGE: "№ 1",
    author: "EGE 2023",
    isOfficial: false,
    actuality: "Актуальна",
    difficulty: "Уровень ЕГЭ",
    topic: "",
  });

  const [allTaskData, setAllTaskData] = useState({
    content: "Введите условие задачи",
    answer: { rows: 0, cols: 0, data: "Ответ по дефолту" },
    solution: "Введите решение на задачу",
    videorazbor: "",
    numberEGE: "№ 1",
    author: "EGE 2023",
    isOfficial: false,
    actuality: "Актуальна",
    difficulty: "Уровень ЕГЭ",
    topic: "",
  });

  const [isSend, setIsSend] = useState(false);

  const [currentFile, setCurrentFile] = useState(null);
  const [files, setFiles] = useState([]);

  const setText = (content) => {
    setAllTaskData({ ...allTaskData, content: content });
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
    const typeAnswer = e.target.value;
    setAllTaskData({
      ...allTaskData,
      answer: getAnswerType(typeAnswer),
    });
    setIsSend(false);
  };

  const setTableSize = ({ number, type }) => {
    setAllTaskData(getTableSize({ number, type, allTaskData }));
    setIsSend(false);
  };

  const handleSendButton = async () => {
    try {
      console.log(allTaskData);
      const res = await axios.post(`http://localhost:5000/api/addtask/`, {
        ...allTaskData,
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
      <div>
        <span>
          {"Официальная задача? "}
          <select
            value={allTaskData.isOfficial ? "Да" : "Нет"}
            onChange={(e) => {
              setAllTaskData({
                ...allTaskData,
                isOfficial: e.target.value === "Да" ? true : false,
              });
            }}
          >
            <option>Да</option>
            <option>Нет</option>
          </select>
        </span>
      </div>
      <div>
        <span>
          {"Актуальность задачи "}
          <select
            value={allTaskData.actuality}
            onChange={(e) => {
              setAllTaskData({
                ...allTaskData,
                actuality: e.target.value,
              });
            }}
          >
            <option>Будет на ЕГЭ</option>
            <option>Актуальна</option>
            <option>Не актуальна</option>
          </select>
        </span>
      </div>
      <div>
        <span>
          {"Сложность задачи "}
          <select
            value={allTaskData.difficulty}
            onChange={(e) => {
              setAllTaskData({
                ...allTaskData,
                difficulty: e.target.value,
              });
            }}
          >
            <option>Гроб</option>
            <option>Чуть сложнее ЕГЭ</option>
            <option>Уровень ЕГЭ</option>
            <option>Легче ЕГЭ</option>
            <option>Гораздо легче ЕГЭ</option>
          </select>
        </span>
      </div>
      <div>
        <span>
          {"Тема задачи "}
          <input
            value={allTaskData.topic}
            onChange={(e) => {
              setAllTaskData({ ...allTaskData, topic: e.target.value });
            }}
          ></input>
        </span>
      </div>

      <h2>Условие задачи</h2>
      <div className="editor">
        <TinyEditor
          setText={setText}
          initialText={initialDataFromServer.content}
        />
        <h3>{allTaskData.content}</h3>
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
