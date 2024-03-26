import axios from "axios";
import { parseTaskFromServer } from "./addTaskUtils";
import { isNewTask } from "../../Pages/AddTask/components/AddTaskUtils";

export const getTaskById = async (
  id,
  setAllTaskData,
  setInitialDataForEditor
) => {
  try {
    const res = await axios.get(process.env.REACT_APP_LINK_GET_TASK_BY_ID + id);
    console.log(res.data);
    if (res.data) {
      const okData = res.data;
      okData.files = JSON.parse(okData.files);
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
      okData.files = JSON.parse(okData.files);

      return { ...okData };
    }
  } catch (error) {
    //setInitialDataFromServer();
    console.log(error);
  }
};

export const getVariantTasksFromServer = async ({
  varId,
  setTasksFromServer,
  setTextInEditor,
  setTextInSolutionEditor,
  setIsOkLoad,
}) => {
  try {
    const res = await axios.get("http://localhost:8080/variants/" + varId);

    if (res.data) {
      let dataOk = res.data;

      dataOk = dataOk.map((task) => {
        return parseTaskFromServer(task);
      });
      setTasksFromServer([...dataOk]);
      if (dataOk.length > 0) {
        setTextInEditor(dataOk[0].content);
        setTextInSolutionEditor(dataOk[0].solution);
      }
      setIsOkLoad(1);
      return [...dataOk];
    }
  } catch (error) {
    console.log(error.response);
    setIsOkLoad(-1);
    return [];
  }
};

export const saveFileOnServer = async (currentFile) => {
  try {
    var formData = new FormData();
    formData.append("file", currentFile);

    const res = axios.post("http://localhost:8080/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    return res;
  } catch (error) {}
};

export const saveTaskOnServer = async ({ allTaskData, locationPath }) => {
  try {
    let answer = {
      ...allTaskData.answer,
    };
    if (allTaskData.answer.cols !== 0 || allTaskData.answer.rows !== 0) {
      answer = {
        ...allTaskData.answer,
        data: JSON.stringify(allTaskData.answer.data),
      };
    }

    let link = process.env.REACT_APP_LINK_ADD_TASK;

    if (!isNewTask(locationPath)) {
      const taskId = Number(locationPath.split("/").reverse()[0]);
      link = link + "/" + String(taskId);
    }

    const res = await axios.post(
      link,
      {
        ...allTaskData,
        answer: answer,
        files: JSON.stringify(allTaskData.files),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return res;
  } catch (error) {}
};
