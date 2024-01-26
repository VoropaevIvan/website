import axios from "axios";

export const getTaskById = async (
  id,
  setInitialDataFromServer,
  setAllTaskData
) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/task/${id}`);

    if (res.data) {
      console.log(res.data);
      setInitialDataFromServer(res.data);
      setAllTaskData(res.data);
    }
  } catch (error) {
    //setInitialDataFromServer();
    console.log(error);
  }
};
