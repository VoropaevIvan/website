import { useSelector } from "react-redux";
import "./TaskTextForVariant.css";

function TaskTextForVariant({ fontScale }) {
  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const varData = useSelector((state) => state.variant.data);

  const curTaskContent = varData[curTaskNumber]
    ? varData[curTaskNumber].content
    : "";

  if (!fontScale) {
    fontScale = 0;
  }
  const font = 1 + fontScale;

  function createMarkup(myContent) {
    return { __html: myContent };
  }

  return (
    <div>
      <p className="varNumberEGE">
        <strong>{"Задание " + (curTaskNumber + 1)}</strong>
      </p>
      <div
        style={{ fontSize: font + "rem" }}
        className="taskcontent"
        dangerouslySetInnerHTML={createMarkup(curTaskContent)}
      />
    </div>
  );
}

export default TaskTextForVariant;
