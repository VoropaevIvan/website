import { justGetTaskById } from "../../../Utils/addTaskUtils/server";

const AddTaskToVariantById = ({
  setNewTaskId,
  newTaskId,
  setTasksFromServer,
  tasksFromServer,
}) => {
  const handleAddTaskById = () => {
    justGetTaskById(Number(newTaskId)).then((value) => {
      setTasksFromServer([...tasksFromServer, value]);
    });
    setNewTaskId("");
  };

  return (
    <div className="addtaskbyid">
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
  );
};
export default AddTaskToVariantById;
