import TinyEditor from "../../../Utils/TinyEditor";

const TaskContentSelect = ({ allTaskData, setText, initialText }) => {
  return (
    <>
      <div className="editor">
        <TinyEditor setText={setText} initialText={initialText} />
      </div>
    </>
  );
};
export default TaskContentSelect;
