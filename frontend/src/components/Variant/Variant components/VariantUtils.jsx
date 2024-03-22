export const addTypeAnswerField = (task) => {
  let typeAns;
  if (task.answer.cols === 0 && task.answer.rows === 0) {
    typeAns = "text";
  } else if (task.answer.cols === 2 && task.answer.rows === 1) {
    typeAns = "two";
  } else {
    typeAns = "table";
  }

  return { ...task, typeAnswer: typeAns };
};
