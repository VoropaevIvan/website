import axios from "axios";
import { useEffect, useState } from "react";
import TinyEditor from "../../Utils/TinyEditor";
import Table from "../../Utils/Table/Table";
import FileView from "../../Utils/FileView";
import { useLocation, useNavigate } from "react-router-dom";
import {
  whatAnswerType,
  getAnswerType,
  getTableSize,
} from "../../Utils/addTaskUtils/addTaskUtils";
import { getTaskById } from "../../Utils/addTaskUtils/server";
import "./AddTask.css";
import {
  ACTUAL,
  DEFAULT_SOLVE_FOR_TASK_TEXT,
  DEFAULT_TASK_TEXT,
  EASY_THEN_EGE,
  GROB,
  LEVEL_OF_EGE,
  LITTLE_HARD_THEN_EGE,
  MUCH_EASY_THEN_EGE,
  NOT_ACTUAL,
  NUMBERS_EGE_NAMES,
  WILL_BE_IN_EGE,
} from "../constants";
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
  const [files, setFiles] = useState([]);

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
      let taskId = -1;

      if (!isNewTask(location.pathname)) {
        taskId = Number(location.pathname.split("/").reverse()[0]);
      }
      const res = await axios.post(process.env.REACT_APP_LINK_ADD_TASK, {
        ...allTaskData,
        id: taskId,
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

    setFiles([...files, `file_${files.length}.txt`]);
  };

  const delFile = (fileName) => {
    setFiles(
      files.filter((file) => {
        return file !== fileName;
      })
    );
  };

  useEffect(() => {
    async function fetchData(taskId) {
      getTaskById(taskId, setAllTaskData, setInitialDataForEditor);
    }
    if (!isNewTask(location.pathname)) {
      fetchData(curTaskId(location.pathname));
      console.log("fetch");
    } else {
      //console.log("НЕ id" + id);
    }
  }, [location]);

  return (
    <div className="addTask">
      <NumberEGESelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
      />
      <SourceSelect allTaskData={allTaskData} setAllTaskData={setAllTaskData} />
      <IsOfficialSelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
      />
      <ActualitySelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
      />
      <DifficultySelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
      />
      <TopicSelect allTaskData={allTaskData} setAllTaskData={setAllTaskData} />
      <TaskContentSelect
        allTaskData={allTaskData}
        setText={setText}
        initialText={initialDataForEditor.content}
      />
      <AnswerSelect
        setIsSend={setIsSend}
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
      />
      <VideoReviewSelect
        allTaskData={allTaskData}
        setAllTaskData={setAllTaskData}
      />

      <details>
        <SolutionSelect
          allTaskData={allTaskData}
          setText={setSolution}
          initialText={initialDataForEditor.solution}
        />
      </details>

      <AddFiles
        files={files}
        delFile={delFile}
        setCurrentFile={setCurrentFile}
        saveFileOnServer={saveFileOnServer}
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
