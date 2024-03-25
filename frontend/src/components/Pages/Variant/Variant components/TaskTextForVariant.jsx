import { useSelector } from "react-redux";
import "./TaskTextForVariant.css";

function TaskTextForVariant() {
  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const varData = useSelector((state) => state.variant.data);
  const curTaskContent = varData[curTaskNumber]
    ? varData[curTaskNumber].content
    : "";

  function createMarkup(myContent) {
    return { __html: myContent };
  }

  return (
    <div>
      <p className="varNumberEGE">
        <strong>{"Задание " + (curTaskNumber + 1)}</strong>
      </p>
      <div dangerouslySetInnerHTML={createMarkup(curTaskContent)} />
    </div>
  );
}

export default TaskTextForVariant;
