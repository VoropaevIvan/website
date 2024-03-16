import axios from "axios";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { getTaskById } from "../../Utils/addTaskUtils/server";
import "./AddTask.css";
import { DEFAULT_SOLVE_FOR_TASK_TEXT, DEFAULT_TASK_TEXT } from "../constants";
import { DEFAULT_ALL_TASK_DATA } from "./AddTaskConstants";
import { curTaskId, isNewTask } from "./components/AddTaskUtils";
import NumberEGESelect from "./components/NumberEGESelect";
import SourceSelect from "./components/SourceSelect";
import IsOfficialSelect from "./components/IsOfficialSelect";
import ActualitySelect from "./components/ActualitySelect";
import DifficultySelect from "./components/DifficultySelect";
import TopicSelect from "./components/TopicSelect";
import TaskContentSelect from "./components/TaskContentSelect";
import AnswerSelect from "./components/AnswerSelect";
import VideoReviewSelect from "./components/VideoReviewSelect";
import SolutionSelect from "./components/SolutionSelect";
import AddFiles from "./components/AddFiles";
import SendButtons from "./components/SendButtons";

const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [allTaskData, setAllTaskData] = useState(DEFAULT_ALL_TASK_DATA);

  const [initialDataForEditor, setInitialDataForEditor] = useState({
    content: DEFAULT_TASK_TEXT,
    solution: DEFAULT_SOLVE_FOR_TASK_TEXT,
  });

  const [isSend, setIsSend] = useState(false);

  const [currentFile, setCurrentFile] = useState(null);
  //const [files, setFiles] = useState([]);

  const setText = (content) => {
    setAllTaskData({ ...allTaskData, content: content });
    setIsSend(false);
  };
  const setSolution = (solution) => {
    setAllTaskData({ ...allTaskData, solution: solution });
    setIsSend(false);
  };

  const handleSendButton = async () => {
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

      if (!isNewTask(location.pathname)) {
        const taskId = Number(location.pathname.split("/").reverse()[0]);
        link = link + "/" + String(taskId);
      }

      const res = await axios.post(link, {
        ...allTaskData,
        answer: answer,
        files: JSON.stringify(allTaskData.files),
      });

      if (res.status === 200) {
        setIsSend(true);
        if (isNewTask(location.pathname)) {
          const curId = res.data;
          navigate("../edit-task/" + curId, { relative: "path" });
        }
      }
    } catch (error) {
      console.log(error);
      alert("Произошла ошибка", error);
    }
  };

  const saveFileOnServer = () => {
    // Send to server...
    try {
      var formData = new FormData();
      formData.append("file", currentFile);

      const res = axios.post("http://localhost:8080/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      res.then((value) => {
        console.log(value.data.location);
        //setFiles([...files, value.data.location]);
        setAllTaskData({
          ...allTaskData,
          files: [...allTaskData.files, value.data.location],
        });
        setIsSend(false);
      });
    } catch (error) {}
  };

  const delFile = (fileName) => {
    const newFiles = allTaskData.files.filter((file) => {
      return file !== fileName;
    });

    setAllTaskData({ ...allTaskData, files: newFiles });
    setIsSend(false);
  };

  useEffect(() => {
    async function fetchData(taskId) {
      getTaskById(taskId, setAllTaskData, setInitialDataForEditor);
    }
    if (!isNewTask(location.pathname)) {
      fetchData(curTaskId(location.pathname));
      console.log("fetch");
    } else {
      //console.log("!!!");
    }
  }, [location]);

  return (
    <div className="addTask">
      <NumberEGESelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
        setIsSend={setIsSend}
      />
      <SourceSelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
        setIsSend={setIsSend}
      />
      <IsOfficialSelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
        setIsSend={setIsSend}
      />
      <ActualitySelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
        setIsSend={setIsSend}
      />
      <DifficultySelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
        setIsSend={setIsSend}
      />
      <TopicSelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
        setIsSend={setIsSend}
      />
      <TaskContentSelect
        allTaskData={allTaskData}
        setText={setText}
        initialText={initialDataForEditor.content}
        setIsSend={setIsSend}
      />
      <AnswerSelect
        setIsSend={setIsSend}
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
      />
      <VideoReviewSelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
        setIsSend={setIsSend}
      />

      <details>
        <SolutionSelect
          allTaskData={allTaskData}
          setText={setSolution}
          initialText={initialDataForEditor.solution}
          setIsSend={setIsSend}
        />
      </details>

      <AddFiles
        files={allTaskData.files}
        delFile={delFile}
        setCurrentFile={setCurrentFile}
        saveFileOnServer={saveFileOnServer}
        setIsSend={setIsSend}
      />
      <SendButtons
        handleSendButton={handleSendButton}
        isSend={isSend}
        location={location}
      />
    </div>
  );
};

export default AddTask;
