import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTaskById, saveTaskOnServer } from "../../Utils/addTaskUtils/server";
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
import { saveFileOnServer as saveFile } from "../../Utils/addTaskUtils/server";
import "./AddTask.css";

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
  const [isOkLoad, setIsOkLoad] = useState(true);
  const [reload, setReload] = useState(0);

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
      const res = await saveTaskOnServer({
        allTaskData,
        locationPath: location.pathname,
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

  const saveFileOnServer = async () => {
    try {
      const res = await saveFile(currentFile);
      setAllTaskData({
        ...allTaskData,
        files: [...allTaskData.files, res.data.location],
      });
      setIsSend(false);
    } catch (error) {
      alert("Файл не сохранён.");
    }
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
      const res = await getTaskById(
        taskId,
        setAllTaskData,
        setInitialDataForEditor
      );
      return res;
    }
    if (!isNewTask(location.pathname)) {
      const res = fetchData(curTaskId(location.pathname));
      res.then((res) => {
        if (res.status !== 200) {
          setIsOkLoad(false);
        }
      });
      console.log("fetch");
    } else {
      setAllTaskData(DEFAULT_ALL_TASK_DATA);
      setCurrentFile(null);
      setIsOkLoad(true);
      setReload(Math.random());
    }
  }, [location]);

  if (!isOkLoad) {
    return (
      <div>
        <h1>Такой задачи нет</h1>
      </div>
    );
  }

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
        reload={reload}
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
          reload={reload}
        />
      </details>

      <AddFiles
        files={allTaskData.files}
        delFile={delFile}
        setCurrentFile={setCurrentFile}
        saveFileOnServer={saveFileOnServer}
        setIsSend={setIsSend}
        reload={reload}
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
