import axios from "axios";
import Task from "./Task/Task";
import { useEffect, useState } from "react";
import "./Tasks.css";

const getAllTasksFromServer = async (setTasksFromServer) => {
  try {
    const res = await axios.get("http://localhost:5000/api/tasks");

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
    <div className="tasks">
      {!!tasksFromServer &&
        tasksFromServer.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              trueAnswer={task.answer}
            />
          );
        })}
    </div>
  );
};
