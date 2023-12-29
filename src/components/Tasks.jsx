import tasks from "../data/tasks";
import Task from "./Task";

export const Tasks = () => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            text={task.text}
            trueAnswer={task.answer}
          />
        );
      })}
    </>
  );
};
