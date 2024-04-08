import axios from "axios";
import Task from "./Task/Task";
import { useEffect, useState } from "react";
import filterFunction from "./Filter/FilterFunction";
import BankFilter from "./Filter/BankFilter";
import { useSelector } from "react-redux";
import sortFunction from "./Filter/sortFunction";
import "./Tasks.css";
import { getAllTasksFromServer } from "../../server/serverBank";

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

  console.log(tasksFromServer);
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
              solvedStatus={task.userAnswer}
              solvedCount={task.stats.solvedCount}
              solvedFirstTryCount={task.stats.solvedFirstTryCount}
            />
          );
        })}
      </div>
    </div>
  );
};
