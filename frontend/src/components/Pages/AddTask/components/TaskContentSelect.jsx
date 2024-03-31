import TinyEditor from "../../../Utils/TinyEditor";

const TaskContentSelect = ({ reload, setText, initialText }) => {
  return (
    <>
      <div className="editor">
        <TinyEditor key={reload} setText={setText} initialText={initialText} />
      </div>
    </>
  );
};
export default TaskContentSelect;
