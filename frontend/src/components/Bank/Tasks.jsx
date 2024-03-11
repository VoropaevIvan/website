import axios from "axios";
import Task from "./Task/Task";
import { useEffect, useState } from "react";
import "./Tasks.css";

const getAllTasksFromServer = async (setTasksFromServer) => {
  try {
    console.log(process.env.REACT_APP_LINK_GET_ALL_TASK);
    const res = await axios.get(process.env.REACT_APP_LINK_GET_ALL_TASK);

    if (res.data) {
      setTasksFromServer(res.data);
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
