import axios from "axios";

export const getTaskById = async (
  id,
  setAllTaskData,
  setInitialDataForEditor
) => {
  try {
    //const res = await axios.get(`http://localhost:5000/api/task/${id}`);
    const res = await axios.get(process.env.REACT_APP_LINK_GET_TASK_BY_ID + id);
    if (res.data) {
      console.log(res.data);
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
