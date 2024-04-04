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
