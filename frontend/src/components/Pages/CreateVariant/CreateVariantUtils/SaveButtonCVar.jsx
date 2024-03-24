const SaveButtonCVar = ({
  tasksFromServer,
  activeTask,
  setTasksFromServer,
  textInEditor,
  textInSolutionEditor,
}) => {
  return (
    <div className="saveeditorbutton">
      <button
        disabled={
          textInEditor === tasksFromServer[activeTask].content &&
          textInSolutionEditor === tasksFromServer[activeTask].solution
        }
        onClick={() => {
          const newData = [...tasksFromServer];
          newData[activeTask].content = textInEditor;
          newData[activeTask].solution = textInSolutionEditor;

          setTasksFromServer(newData);
        }}
      >
        Сохранить
      </button>
    </div>
  );
};
export default SaveButtonCVar;
