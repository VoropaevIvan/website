import axios from "axios";
import {
  parseTaskFromServer,
  prepareTaskToServer,
} from "../../../Utils/addTaskUtils/addTaskUtils";

const SendToServerButton = ({
  tasksFromServer,
  location,
  setTasksFromServer,
}) => {
  const handleButtonClick = () => {
    const okData = tasksFromServer.map((task) => {
      return prepareTaskToServer(task);
    });

    const link = process.env.REACT_APP_LINK_VARIANT;

    const res = axios.post(
      link + location.pathname.split("/").reverse()[0],
      { tasks: okData, maxScore: 29, isEGEFormat: true },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    res.then((value) => {
      let tasks = value.data.tasks;

      tasks = tasks.map((task) => {
        return parseTaskFromServer(task);
      });

      setTasksFromServer([...tasks]);
    });
  };
  return (
    <div className="savetoserverbutton">
      <button onClick={handleButtonClick}>Отправить на сервер</button>
    </div>
  );
};
export default SendToServerButton;
