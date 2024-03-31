import axios from "axios";
import Task from "./Task/Task";
import { useEffect, useState } from "react";
import filterFunction from "./Filter/FilterFunction";
import BankFilter from "./Filter/BankFilter";
import { useSelector } from "react-redux";
import sortFunction from "./Filter/sortFunction";
import "./Tasks.css";

const getAllTasksFromServer = async (setTasksFromServer) => {
  try {
    const res = await axios.get(process.env.REACT_APP_LINK_GET_ALL_TASK);

    if (res.data) {
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
    }
  } catch (error) {
    console.log(error);
  }
};

export const Tasks = () => {
  const filtersData = useSelector((state) => state.bankFilter);

  const [tasksFromServer, setTasksFromServer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      getAllTasksFromServer(setTasksFromServer);
    }
    fetchData();
  }, []);

  let filteredTasksFromServer = [];
  if (tasksFromServer) {
    filteredTasksFromServer = tasksFromServer.filter((task) => {
      return filterFunction(task, filtersData);
    });
  }

  let sortedAndFilteredTasks = sortFunction(
    filteredTasksFromServer,
    filtersData.sorting
  );

  return (
    <div className="bank">
      <BankFilter />

      <div className="tasks">
        {sortedAndFilteredTasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              content={task.content}
              trueAnswer={task.answer}
              numberEGE={task.numberEGE}
              isOfficial={task.isOfficial}
              actuality={task.actuality}
              difficulty={task.difficulty}
              files={task.files}
            />
          );
        })}
      </div>
    </div>
  );
};
