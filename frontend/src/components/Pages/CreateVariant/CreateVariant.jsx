import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TinyEditor from "../../Utils/TinyEditor";

import {
  getVariantTasksFromServer,
  saveFileOnServer,
} from "../../Utils/addTaskUtils/server";

import AnswerSelect from "../AddTask/components/AnswerSelect";
import ActualitySelect from "../AddTask/components/ActualitySelect";
import NumberEGESelect from "../AddTask/components/NumberEGESelect";
import SourceSelect from "../AddTask/components/SourceSelect";
import IsOfficialSelect from "../AddTask/components/IsOfficialSelect";
import DifficultySelect from "../AddTask/components/DifficultySelect";
import TopicSelect from "../AddTask/components/TopicSelect";
import VideoReviewSelect from "../AddTask/components/VideoReviewSelect";

import { DEFAULT_ALL_TASK_DATA } from "../AddTask/AddTaskConstants";
import AddFiles from "../AddTask/components/AddFiles";
import {
  delFileFromFilesList,
  replaceTaskByPosition,
} from "../../Utils/addTaskUtils/addTaskUtils";

import NavigationCVar from "./CreateVariantUtils/NavigationCVar";
import SaveButtonCVar from "./CreateVariantUtils/SaveButtonCVar";
import AddTaskToVariantById from "./CreateVariantUtils/AddTaskToVariantById";
import SendToServerButton from "./CreateVariantUtils/SendToServerButton";

import "./CreateVariant.css";

const CreateVariant = () => {
  const location = useLocation();

  const [activeTask, setActiveTask] = useState(0);
  const [tasksFromServer, setTasksFromServer] = useState([]);
  const [newTaskId, setNewTaskId] = useState("");

  const [textInEditor, setTextInEditor] = useState("");
  const [textInSolutionEditor, setTextInSolutionEditor] = useState("");
  const [isOkLoad, setIsOkLoad] = useState(0);
  const [countNewTasks, setCountNewTasks] = useState(1);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    async function fetchData(varId) {
      getVariantTasksFromServer({
        varId: varId,
        setTasksFromServer,
        setTextInEditor,
        setTextInSolutionEditor,
        setIsOkLoad,
      });
    }
    const varId = location.pathname.split("/").reverse()[0];
    if (varId) {
      fetchData(varId);
    }
  }, [location]);

  const updateTasks = (task) => {
    const newTasks = tasksFromServer;
    newTasks[activeTask] = task;
    setTasksFromServer([...newTasks]);
  };

  const delFile = (fileName) => {
    const newFiles = delFileFromFilesList({
      fileNameToErase: fileName,
      files: tasksFromServer[activeTask].files,
    });

    setTasksFromServer(
      replaceTaskByPosition({
        tasks: tasksFromServer,
        position: activeTask,
        task: {
          ...tasksFromServer[activeTask],
          files: newFiles,
        },
      })
    );
  };

  const handleSaveFileOnServer = () => {
    try {
      const res = saveFileOnServer(currentFile);
      res.then((value) => {
        const newTasks = replaceTaskByPosition({
          tasks: tasksFromServer,
          position: activeTask,
          task: {
            ...tasksFromServer[activeTask],
            files: [...tasksFromServer[activeTask].files, value.data.location],
          },
        });
        setTasksFromServer([...newTasks]);
      });
    } catch (error) {}
  };

  if (isOkLoad === -1) {
    return <h1>Такого варианта нет!</h1>;
  }

  if (isOkLoad === 0) {
    return <></>;
  }

  if (tasksFromServer.length === 0) {
    setTasksFromServer([
      ...tasksFromServer,
      { ...DEFAULT_ALL_TASK_DATA, id: -countNewTasks },
    ]);
    setCountNewTasks(countNewTasks + 1);
    return <></>;
  }

  return (
    <div className="createvariant">
      <NavigationCVar
        tasksFromServer={tasksFromServer}
        setTasksFromServer={setTasksFromServer}
        setCountNewTasks={setCountNewTasks}
        countNewTasks={countNewTasks}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
      />

      <NumberEGESelect
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
        setIsSend={() => {}}
      />

      <ActualitySelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <IsOfficialSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <DifficultySelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <SourceSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <TopicSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <VideoReviewSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={updateTasks}
      />

      <div className="taskincvar">
        <TinyEditor
          setText={(x) => {
            setTextInEditor(x);
          }}
          initialText={tasksFromServer[activeTask].content}
        />
      </div>

      <SaveButtonCVar
        tasksFromServer={tasksFromServer}
        activeTask={activeTask}
        setTasksFromServer={setTasksFromServer}
        textInEditor={textInEditor}
        textInSolutionEditor={textInSolutionEditor}
      />

      <AnswerSelect
        setIsSend={() => {}}
        allTaskData={tasksFromServer[activeTask]}
        setAllTaskData={(task) => {
          const newTasks = tasksFromServer;
          newTasks[activeTask] = task;
          setTasksFromServer([...newTasks]);
        }}
      />

      <details>
        <summary>Решение</summary>
        <div className="taskincvar">
          <TinyEditor
            setText={(x) => {
              setTextInSolutionEditor(x);
            }}
            initialText={tasksFromServer[activeTask].solution}
            activeTask={activeTask}
          />
        </div>
      </details>

      <AddFiles
        files={tasksFromServer[activeTask].files}
        delFile={delFile}
        setCurrentFile={setCurrentFile}
        saveFileOnServer={handleSaveFileOnServer}
        setIsSend={() => {}}
      />

      <AddTaskToVariantById
        setNewTaskId={setNewTaskId}
        newTaskId={newTaskId}
        setTasksFromServer={setTasksFromServer}
        tasksFromServer={tasksFromServer}
      />
      <SendToServerButton
        tasksFromServer={tasksFromServer}
        location={location}
        setTasksFromServer={setTasksFromServer}
      />
    </div>
  );
};
export default CreateVariant;
