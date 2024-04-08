import { checkAnswer } from "../../../Utils/variant/variantUtils";

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

export const addTypeAnswerFieldForTasks = (tasks) => {
  return tasks.map((task) => {
    return addTypeAnswerField(task);
  });
};

export const createVarResults = ({ answers, varTasks }) => {
  const answersForServer = {};
  for (var taskPos in answers) {
    let k = 1;
    if (taskPos === "25" || taskPos === "26") {
      k = 2;
    }

    answersForServer[taskPos] = {
      userAnswer: answers[taskPos],
      scores: checkAnswer(answers[taskPos], varTasks[taskPos]["answer"]) * k,
    };
    if (
      answersForServer[taskPos].userAnswer.cols !== 0 ||
      answersForServer[taskPos].userAnswer.rows !== 0
    ) {
      answersForServer[taskPos] = {
        userAnswer: {
          ...answers[taskPos],
          data: JSON.stringify(answers[taskPos].data),
        },
        scores: checkAnswer(answers[taskPos], varTasks[taskPos]["answer"]) * k,
      };
    }
  }

  return { ...answersForServer };
};

export const addTrueAnswer = (answersWithBalls, varTasks) => {
  return varTasks.map((task, i) => {
    let userAnswer = answersWithBalls[String(i)]
      ? answersWithBalls[String(i)].userAnswer
      : null;
    if (userAnswer !== null) {
      if (userAnswer.cols !== 0 || userAnswer.rows !== 0) {
        userAnswer = { ...userAnswer, data: JSON.stringify(userAnswer.data) };
      }
    }
    return {
      scores: answersWithBalls[String(i)]
        ? answersWithBalls[String(i)].scores
        : 0,
      userAnswer: userAnswer,
      rightAnswer: task.answer,
    };
  });
};
