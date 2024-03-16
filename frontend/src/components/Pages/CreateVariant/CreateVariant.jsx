import axios from "axios";
import { useEffect, useState } from "react";
import TinyEditor from "../../Utils/TinyEditor";
import "./CreateVariant.css";
import { getTaskById, justGetTaskById } from "../../Utils/addTaskUtils/server";

const getAllTasksFromServer = async (setTasksFromServer) => {
  try {
    const res = await axios.get(process.env.REACT_APP_LINK_GET_ALL_TASK);

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
      setTasksFromServer(dataOk.slice(0, 2));
    }
  } catch (error) {
    console.log(error);
  }
};

const CreateVariant = () => {
  const [activeTask, setActiveTask] = useState(0);
  const [tasksFromServer, setTasksFromServer] = useState([]);
  const [newTaskId, setNewTaskId] = useState("");
  const [textInEditor, setTextInEditor] = useState("");

  const handleAddTaskById = () => {
    justGetTaskById(Number(newTaskId)).then((value) => {
      setTasksFromServer([...tasksFromServer, value]);
    });
  };

  useEffect(() => {
    async function fetchData() {
      getAllTasksFromServer(setTasksFromServer);
    }
    fetchData();
  }, []);

  return (
    <div className="createvariant">
      <div>
        {tasksFromServer.map((el, i) => {
          return (
            <button
              key={i}
              className={i === activeTask ? "activebutincreatevar" : ""}
              onClick={() => {
                //setTasksFromServerNotChange(tasksFromServer);
                setActiveTask(i);
              }}
            >
              {i}
            </button>
          );
        })}
      </div>
      {tasksFromServer.length > 0 && (
        <div className="taskincvar">
          <TinyEditor
            setText={(x) => {
              setTextInEditor(x);
            }}
            initialText={tasksFromServer[activeTask].content}
            activeTask={activeTask}
          />
        </div>
      )}
      <div>
        <button
          onClick={() => {
            const newData = [...tasksFromServer];
            newData[activeTask].content = textInEditor;

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
        {tasksFromServer.length > 0 && (
          <p>{tasksFromServer[activeTask].content}</p>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            console.log(tasksFromServer);
          }}
        >
          Отправить на сервер
        </button>
      </div>
    </div>
  );
};
export default CreateVariant;
