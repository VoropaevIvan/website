import axios from "axios";

export const sendSolve = async ({ taskId, isRight, answer }) => {
  try {
    const link = process.env.REACT_APP_SEND_TASK_SOLVE;
    console.log("!", { taskId, answer, isRight });
    const res = await axios.post(
      link,
      { taskId, answer, isRight },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return res;
  } catch (error) {
    alert("Не удалось сохранить решение на сервере.");
    return [];
  }
};

export const getAllTasksFromServer = async (setTasksFromServer) => {
  try {
    const res = await axios.get(process.env.REACT_APP_LINK_GET_ALL_TASK, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    console.log(res);
    if (res.data) {
      let dataOk = res.data;

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
      setTasksFromServer(dataOk);
    }
  } catch (error) {
    alert("Не удалось загрузить задачи. Попробуйте позже.");
    console.log(error);
  }
};
