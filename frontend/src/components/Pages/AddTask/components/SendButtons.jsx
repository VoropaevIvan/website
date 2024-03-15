import { isNewTask } from "./AddTaskUtils";

const SendButtons = ({ handleSendButton, isSend, location }) => {
  return (
    <span>
      <button className="sendButton" onClick={handleSendButton}>
        {isNewTask(location.pathname) ? "Добавить задачу" : "Обновить задачу"}
      </button>
      {isSend && <strong>Сохранено!</strong>}
    </span>
  );
};
export default SendButtons;
