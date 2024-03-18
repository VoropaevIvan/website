import axios from "axios";

const SendToServerButton = ({
  tasksFromServer,
  location,
  setTasksFromServer,
}) => {
  const handleButtonClick = () => {
    const okData = tasksFromServer.map((task) => {
      let answer = {
        ...task.answer,
      };
      if (task.answer.cols !== 0 || task.answer.rows !== 0) {
        answer = {
          ...task.answer,
          data: JSON.stringify(task.answer.data),
        };
      }
      task = {
        ...task,
        answer: answer,
        files: JSON.stringify(task.files),
      };
      return task;
    });
    console.log(okData);
    const res = axios.post(
      "http://localhost:8080/variants/" +
        location.pathname.split("/").reverse()[0],
      okData
    );
    res.then((value) => {
      console.log("ret", value.data);
      let dataOk = value.data;

      dataOk = dataOk.map((e) => {
        return e.answer.rows !== 0 || e.answer.cols !== 0
          ? {
              ...e,
              answer: { ...e.answer, data: JSON.parse(e.answer.data) },
            }
          : e;
      });
      dataOk = dataOk.map((task) => {
        return { ...task, files: JSON.parse(task.files) };
      });
      setTasksFromServer([...dataOk]);
    });
  };
  return (
    <div>
      <button onClick={handleButtonClick}>Отправить на сервер</button>
    </div>
  );
};
export default SendToServerButton;
