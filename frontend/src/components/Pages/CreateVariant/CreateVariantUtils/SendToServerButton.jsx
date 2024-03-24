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

    console.log(okData);
    const res = axios.post(
      "http://localhost:8080/variants/" +
        location.pathname.split("/").reverse()[0],
      okData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    res.then((value) => {
      console.log("ret", value.data);
      let dataOk = value.data;

      dataOk = dataOk.map((task) => {
        return parseTaskFromServer(task);
      });

      setTasksFromServer([...dataOk]);
    });
  };
  return (
    <div className="savetoserverbutton">
      <button onClick={handleButtonClick}>Отправить на сервер</button>
    </div>
  );
};
export default SendToServerButton;
