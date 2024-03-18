export const whatAnswerType = ({ cols, rows }) => {
  return cols === 0 && rows === 0 ? "Текстовое поле" : "Таблица";
};

export const createDataForTable = ({ cols, rows }) => {
  let initialData = [];
  for (let i = 1; i <= rows; i++) {
    let obj = [];
    for (let j = 1; j <= cols; j++) {
      obj.push("");
    }
    initialData.push(obj);
  }
  return JSON.parse(JSON.stringify(initialData));
};

export const getAnswerType = (typeAnswer) => {
  if (typeAnswer === "Текстовое поле") {
    return { cols: 0, rows: 0, data: "" };
  } else {
    return { cols: 2, rows: 1, data: [["", ""]] };
  }
};

export const getTableSize = ({ number, type, allTaskData }) => {
  if (type === "cols") {
    return {
      ...allTaskData,
      answer: {
        ...allTaskData.answer,
        cols: Number(number),
        data: createDataForTable({
          cols: Number(number),
          rows: allTaskData.answer.rows,
        }),
      },
    };
  } else {
    return {
      ...allTaskData,
      answer: {
        ...allTaskData.answer,
        rows: Number(number),
        data: createDataForTable({
          cols: allTaskData.answer.cols,
          rows: Number(number),
        }),
      },
    };
  }
};

export const parseTaskFromServer = (task) => {
  let taskOk = { ...task };

  if (taskOk.answer.rows !== 0 || taskOk.answer.cols !== 0) {
    taskOk = {
      ...taskOk,
      answer: { ...taskOk.answer, data: JSON.parse(taskOk.answer.data) },
    };
  }

  taskOk = { ...taskOk, files: JSON.parse(taskOk.files) };

  return { ...taskOk };
};

export const delFileFromFilesList = ({ fileNameToErase, files }) => {
  return files.filter((file) => {
    return file !== fileNameToErase;
  });
};

export const replaceTaskByPosition = ({ tasks, position, task }) => {
  const newTasks = tasks;
  newTasks[position] = task;
  return [...newTasks];
};
