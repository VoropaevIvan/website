import { Reorder } from "framer-motion";
import { DEFAULT_ALL_TASK_DATA } from "../../AddTask/AddTaskConstants";

const NavigationCVar = ({
  tasksFromServer,
  setTasksFromServer,
  setActiveTask,
  setCountNewTasks,
  countNewTasks,
  activeTask,
}) => {
  return (
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
  );
};
export default NavigationCVar;
