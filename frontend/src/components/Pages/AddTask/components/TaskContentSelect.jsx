import TinyEditor from "../../../Utils/TinyEditor";

const TaskContentSelect = ({ allTaskData, setText, initialText }) => {
  return (
    <>
      <h2>Условие задачи</h2>
      <div className="editor">
        <TinyEditor setText={setText} initialText={initialText} />
        <h3>{allTaskData.content}</h3>
      </div>
    </>
  );
};
export default TaskContentSelect;
