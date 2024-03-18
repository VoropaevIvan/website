import axios from "axios";
import { useEffect, useState } from "react";
import TinyEditor from "../../Utils/TinyEditor";
import "./CreateVariant.css";
import { justGetTaskById } from "../../Utils/addTaskUtils/server";
import AnswerSelect from "../AddTask/components/AnswerSelect";
import ActualitySelect from "../AddTask/components/ActualitySelect";
import NumberEGESelect from "../AddTask/components/NumberEGESelect";
import SourceSelect from "../AddTask/components/SourceSelect";
import IsOfficialSelect from "../AddTask/components/IsOfficialSelect";
import DifficultySelect from "../AddTask/components/DifficultySelect";
import TopicSelect from "../AddTask/components/TopicSelect";
import VideoReviewSelect from "../AddTask/components/VideoReviewSelect";
import { DEFAULT_ALL_TASK_DATA } from "../AddTask/AddTaskConstants";
import { useLocation } from "react-router-dom";
import { Reorder } from "framer-motion";

const getVariantTasksFromServer = async ({
  varId,
  setTasksFromServer,
  setTextInEditor,
  setTextInSolutionEditor,
  setIsOkLoad,
}) => {
  try {
    //TO DO
    console.log("Get " + varId);
    const res = await axios.get("http://localhost:8080/variants/" + varId);

    if (res.data) {
      //console.log(res.data);
      let dataOk = res.data;

      dataOk = dataOk.map((e) => {
        return e.answer.rows !== 0 || e.answer.cols !== 0
          ? {
              ...e,
              answer: { ...e.answer, data: JSON.parse(e.answer.data) },
            }
          : e;
      });
      dataOk = dataOk.map((task) => {
        return { ...task, files: JSON.parse(task.files) };
      });
      setTasksFromServer(dataOk);
      if (dataOk.length > 0) {
        setTextInEditor(dataOk[0].content);
        setTextInSolutionEditor(dataOk[0].solution);
      }
      setIsOkLoad(1);
    }
  } catch (error) {
    console.log(error.response);
    //setTasksFromServer([{ ...DEFAULT_ALL_TASK_DATA, id: 10101 }]);
    setIsOkLoad(-1);
  }
};

const CreateVariant = () => {
  const [activeTask, setActiveTask] = useState(0);
  const [tasksFromServer, setTasksFromServer] = useState([]);
  const [newTaskId, setNewTaskId] = useState("");

  const [textInEditor, setTextInEditor] = useState("");
  const [textInSolutionEditor, setTextInSolutionEditor] = useState("");
  const [isOkLoad, setIsOkLoad] = useState(0);
  const [countNewTasks, setCountNewTasks] = useState(1);

  const location = useLocation();

  console.log(location.pathname);

  const [tasks, setTasks] = useState(["task 0", "task 1", "task 2", "task 3"]);

  const handleAddTaskById = () => {
    justGetTaskById(Number(newTaskId)).then((value) => {
      setTasksFromServer([...tasksFromServer, value]);
    });
    setNewTaskId("");
  };

  useEffect(() => {
    async function fetchData(varId) {
      getVariantTasksFromServer({
        varId: varId,
        setTasksFromServer,
        setTextInEditor,
        setTextInSolutionEditor,
        setIsOkLoad,
      });
    }
    const varId = location.pathname.split("/").reverse()[0];
    if (varId) {
      fetchData(varId);
    }
  }, [location]);

  const updateTasks = (task) => {
    const newTasks = tasksFromServer;
    newTasks[activeTask] = task;
    setTasksFromServer([...newTasks]);
  };

  if (isOkLoad === -1) {
    return <h1>Такого варианта нет!</h1>;
  }
  if (isOkLoad === 0) {
    return <></>;
  }
  if (tasksFromServer.length === 0) {
    setTasksFromServer([
      ...tasksFromServer,
      { ...DEFAULT_ALL_TASK_DATA, id: -countNewTasks },
    ]);
    setCountNewTasks(countNewTasks + 1);
    return <></>;
  }

  return (
    <div className="createvariant">
      <div>
        <Reorder.Group
          axis="x"
          values={tasksFromServer}
          onReorder={setTasksFromServer}
        >
          {tasksFromServer.map((el, i) => {
            return (
              <Reorder.Item key={el.id} value={el}>
                <button
                  key={i}
                  className={i === activeTask ? "activebutincreatevar" : ""}
                  onClick={() => {
                    //setTasksFromServerNotChange(tasksFromServer);
                    setActiveTask(i);
                  }}
                >
                  {el.id}
                </button>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
        <button
          onClick={() => {
            setTasksFromServer([
              ...tasksFromServer,
              { ...DEFAULT_ALL_TASK_DATA, id: -countNewTasks },
            ]);
            setCountNewTasks(countNewTasks + 1);
          }}
        >
          +
        </button>
      </div>

      <NumberEGESelect
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
        setIsSend={() => {}}
      />

      <ActualitySelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <IsOfficialSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <DifficultySelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <SourceSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <TopicSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <VideoReviewSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <div className="taskincvar">
        <TinyEditor
          setText={(x) => {
            setTextInEditor(x);
          }}
          initialText={tasksFromServer[activeTask].content}
        />
      </div>

      <div>
        <AnswerSelect
          setIsSend={() => {}}
          allTaskData={tasksFromServer[activeTask]}
          setAllTaskData={(task) => {
            const newTasks = tasksFromServer;
            newTasks[activeTask] = task;
            setTasksFromServer([...newTasks]);
          }}
        />
      </div>

      <details>
        <summary>Решение</summary>
        <div className="taskincvar">
          <TinyEditor
            setText={(x) => {
              setTextInSolutionEditor(x);
            }}
            initialText={tasksFromServer[activeTask].solution}
            activeTask={activeTask}
          />
        </div>
      </details>

      <div>
        <button
          disabled={
            textInEditor === tasksFromServer[activeTask].content &&
            textInSolutionEditor === tasksFromServer[activeTask].solution
          }
          onClick={() => {
            const newData = [...tasksFromServer];
            newData[activeTask].content = textInEditor;
            newData[activeTask].solution = textInSolutionEditor;

            setTasksFromServer(newData);
          }}
        >
          Сохранить
        </button>
      </div>
      <div>
        <input
          value={newTaskId}
          onChange={(e) => {
            setNewTaskId(e.target.value);
          }}
        ></input>
        <button onClick={handleAddTaskById} className="addtaskcvar">
          Добавить задачу
        </button>
      </div>
      <div>
        <p>{tasksFromServer[activeTask].content}</p>
      </div>
      <div>
        <button
          onClick={() => {
            const okData = tasksFromServer.map((task) => {
              let answer = {
                ...task.answer,
              };
              if (task.answer.cols !== 0 || task.answer.rows !== 0) {
                answer = {
                  ...task.answer,
                  data: JSON.stringify(task.answer.data),
                };
              }
              task = {
                ...task,
                answer: answer,
                files: JSON.stringify(task.files),
              };
              return task;
            });
            console.log(okData);
            const res = axios.post(
              "http://localhost:8080/variants/" +
                location.pathname.split("/").reverse()[0],
              okData
            );
            res.then((value) => {
              console.log("ret", value.data);
              let dataOk = value.data;

              dataOk = dataOk.map((e) => {
                return e.answer.rows !== 0 || e.answer.cols !== 0
                  ? {
                      ...e,
                      answer: { ...e.answer, data: JSON.parse(e.answer.data) },
                    }
                  : e;
              });
              dataOk = dataOk.map((task) => {
                return { ...task, files: JSON.parse(task.files) };
              });
              setTasksFromServer(dataOk);
            });
          }}
        >
          Отправить на сервер
        </button>
      </div>
    </div>
  );
};
export default CreateVariant;
