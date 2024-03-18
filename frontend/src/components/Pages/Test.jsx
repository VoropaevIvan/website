import { useState } from "react";
import Table from "../Utils/Table/Table";
import { Reorder } from "framer-motion";

export const Test = () => {
  //const [buttons, setButtons] = useState([0, 1, 2, 3]);
  const [tasks, setTasks] = useState(["task 0", "task 1", "task 2", "task 3"]);
  console.log(tasks);
  return (
    <Reorder.Group axis="y" values={tasks} onReorder={setTasks}>
      {tasks.map((el, i) => (
        <Reorder.Item key={tasks[i]} value={tasks[i]}>
          <button>{el}</button>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
