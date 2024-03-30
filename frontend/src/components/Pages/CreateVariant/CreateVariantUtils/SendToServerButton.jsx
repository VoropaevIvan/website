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
    const link = process.env.REACT_APP_LINK_VARIANT;
    console.log(link);
    const res = axios.post(
      link + location.pathname.split("/").reverse()[0],
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
