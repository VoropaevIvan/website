import TinyEditor from "../../../Utils/TinyEditor";

const SolutionSelect = ({ allTaskData, setText, initialText }) => {
  return (
    <>
      <summary>Текстовое решение задачи</summary>
      <div className="editor">
        <TinyEditor setText={setText} height={350} initialText={initialText} />
        <h3>{allTaskData.solution}</h3>
      </div>
    </>
  );
};
export default SolutionSelect;
