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
    return res;
  } catch (error) {
    //setInitialDataFromServer();
    console.log(error);
    return { status: 404 };
  }
};

export const justGetTaskById = async (id) => {
  try {
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
    const link = process.env.REACT_APP_LINK_VARIANT;
    const res = await axios.get(link + varId);

    console.log(res.data);
    if (res.data) {
      let tasks = res.data.tasks;

      tasks = tasks.map((task) => {
        return parseTaskFromServer(task);
      });
      setTasksFromServer([...tasks]);
      if (tasks.length > 0) {
        setTextInEditor(tasks[0].content);
        setTextInSolutionEditor(tasks[0].solution);
      }
      setIsOkLoad(1);
      return [...tasks];
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

    const link = process.env.REACT_APP_LINK_LOAD_FILE;
    const res = axios.post(link, formData, {
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
        hiddenInBank: false, // TO DO
        files: JSON.stringify(allTaskData.files),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
