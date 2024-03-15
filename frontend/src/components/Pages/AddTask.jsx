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
import {
  ACTUAL,
  DEFAULT_SOLVE_FOR_TASK_TEXT,
  DEFAULT_TASK_TEXT,
  EASY_THEN_EGE,
  GROB,
  LEVEL_OF_EGE,
  LITTLE_HARD_THEN_EGE,
  MUCH_EASY_THEN_EGE,
  NOT_ACTUAL,
  NUMBERS_EGE_NAMES,
  WILL_BE_IN_EGE,
} from "./constants";

const isNewTask = (pathname) => {
  const id = pathname.split("/").reverse()[0];
  return !(!isNaN(Number(id)) && id);
};
const curTaskId = (pathname) => {
  const id = pathname.split("/").reverse()[0];
  return Number(id);
};

const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [allTaskData, setAllTaskData] = useState({
    content: "---",
    answer: { rows: 0, cols: 0, data: "" },
    solution: "---",
    videoReview: "",
    numberEGE: "№ 1",
    source: "",
    isOfficial: false,
    actuality: "Актуальна",
    difficulty: "Уровень ЕГЭ",
    topic: "",
  });

  const [initialDataForEditor, setInitialDataForEditor] = useState({
    content: DEFAULT_TASK_TEXT,
    solution: DEFAULT_SOLVE_FOR_TASK_TEXT,
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
      let taskId = -1;

      if (!isNewTask(location.pathname)) {
        taskId = Number(location.pathname.split("/").reverse()[0]);
      }
      const res = await axios.post(process.env.REACT_APP_LINK_ADD_TASK, {
        ...allTaskData,
        id: taskId,
      });

      if (res.status === 200) {
        setIsSend(true);
        if (isNewTask(location.pathname)) {
          const curId = res.data;
          navigate("../edit-task/" + curId, { relative: "path" });
        }
      }
    } catch (error) {
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
    async function fetchData(taskId) {
      getTaskById(taskId, setAllTaskData, setInitialDataForEditor);
    }
    if (!isNewTask(location.pathname)) {
      fetchData(curTaskId(location.pathname));
      console.log("fetch");
    } else {
      //console.log("НЕ id" + id);
    }
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
            {NUMBERS_EGE_NAMES.map((s) => {
              return <option key={s}>{s}</option>;
            })}
          </select>
        </p>
      </span>

      <span>
        {"Откуда задача "}
        <input
          value={allTaskData.source}
          onChange={(e) => {
            setAllTaskData({ ...allTaskData, source: e.target.value });
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
            <option>{WILL_BE_IN_EGE}</option>
            <option>{ACTUAL}</option>
            <option>{NOT_ACTUAL}</option>
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
            <option>{GROB}</option>
            <option>{LITTLE_HARD_THEN_EGE}</option>
            <option>{LEVEL_OF_EGE}</option>
            <option>{EASY_THEN_EGE}</option>
            <option>{MUCH_EASY_THEN_EGE}</option>
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
          initialText={initialDataForEditor.content}
        />
        <h3>{allTaskData.content}</h3>
      </div>
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
      <div className="videorazbor">
        <span>
          Видеоразбор
          <input
            value={allTaskData.videoReview}
            onChange={(e) => {
              setAllTaskData({ ...allTaskData, videoReview: e.target.value });
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
            initialText={initialDataForEditor.solution}
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
          {isNewTask(location.pathname) ? "Добавить задачу" : "Обновить задачу"}
        </button>
        {isSend && (
          <strong>
            {isNewTask(location.pathname)
              ? "Задача добавлена"
              : "Задача обновлена"}
          </strong>
        )}
      </span>
    </div>
  );
};

export default AddTask;
