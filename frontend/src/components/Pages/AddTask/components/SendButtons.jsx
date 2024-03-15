import { isNewTask } from "./AddTaskUtils";

const SendButtons = ({ handleSendButton, isSend, location }) => {
  return (
    <span>
      <button className="sendButton" onClick={handleSendButton}>
        {isNewTask(location.pathname) ? "Добавить задачу" : "Обновить задачу"}
      </button>
      {isSend && (
        <strong>
          {isNewTask(location.pathname)
            ? "Задача добавлена"
            : "Задача обновлена"}
        </strong>
      )}
    </span>
  );
};
export default SendButtons;
