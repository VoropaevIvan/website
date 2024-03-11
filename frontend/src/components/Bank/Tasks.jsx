import axios from "axios";
import Task from "./Task/Task";
import { useEffect, useState } from "react";
import "./Tasks.css";

const getAllTasksFromServer = async (setTasksFromServer) => {
  try {
    const res = await axios.get(process.env.REACT_APP_LINK_GET_ALL_TASK);

    if (res.data) {
      let dataOk = res.data.map((e) => {
        return { ...e, answer: JSON.parse(e.answer) };
      });
      dataOk = dataOk.map((e) => {
        return e.answer.rows !== 0
          ? {
              ...e,
              answer: { ...e.answer, data: JSON.parse(e.answer.data) },
            }
          : e;
      });
      setTasksFromServer(dataOk);
    }
  } catch (error) {
    console.log(error);
  }
};

export const Tasks = () => {
  const [tasksFromServer, setTasksFromServer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      getAllTasksFromServer(setTasksFromServer);
    }
    fetchData();
  }, []);

  return (
    <div className="bank">
      <div className="tasks">
        {!!tasksFromServer &&
          tasksFromServer.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                content={task.content}
                trueAnswer={task.answer}
              />
            );
          })}
      </div>
    </div>
  );
};
