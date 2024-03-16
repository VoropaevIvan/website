import axios from "axios";

export const getTaskById = async (
  id,
  setAllTaskData,
  setInitialDataForEditor
) => {
  try {
    //const res = await axios.get(`http://localhost:5000/api/task/${id}`);
    const res = await axios.get(process.env.REACT_APP_LINK_GET_TASK_BY_ID + id);
    console.log(res.data);
    if (res.data) {
      const okData = res.data;
      if (okData.answer.cols !== 0 || okData.answer.rows !== 0) {
        okData.answer = {
          ...okData.answer,
          data: JSON.parse(okData.answer.data),
        };
      }
      setAllTaskData(res.data);
      setInitialDataForEditor({
        content: res.data.content,
        solution: res.data.solution,
      });
    }
  } catch (error) {
    //setInitialDataFromServer();
    console.log(error);
  }
};

export const justGetTaskById = async (id) => {
  try {
    //const res = await axios.get(`http://localhost:5000/api/task/${id}`);
    const res = await axios.get(process.env.REACT_APP_LINK_GET_TASK_BY_ID + id);
    if (res.data) {
      const okData = res.data;
      if (okData.answer.cols !== 0 || okData.answer.rows !== 0) {
        okData.answer = {
          ...okData.answer,
          data: JSON.parse(okData.answer.data),
        };
      }

      return okData;
    }
  } catch (error) {
    //setInitialDataFromServer();
    console.log(error);
  }
};
