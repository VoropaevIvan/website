import { eraseEmptyRowsFromTable } from "../addTaskUtils/variantUtils";

export const countUserAns = (curAnswers, length) => {
  let count = 0;
  for (let i = 0; i < length; i++) {
    if (curAnswers[i]) {
      count++;
    }
  }
  return count;
};

export const emptyAnswerTable = (ans) => {
  for (let i = 0; i < ans.rows; i++) {
    for (let j = 0; j < ans.cols; j++) {
      if (ans.data[i][j] !== "") {
        return false;
      }
    }
  }
  return true;
};

// (-1: NG), (0: WA), (1: OK)
export const checkAnswer = (userAnswer, trueAnswer) => {
  // empty userAnswer
  if (userAnswer === undefined) {
    return -1;
  }

  // String answer
  if (trueAnswer.cols === 0 && trueAnswer.rows === 0) {
    if (userAnswer.data.trim() === trueAnswer.data.trim()) {
      return 1;
    } else {
      return 0;
    }
  }

  if (trueAnswer.cols === 2 && trueAnswer.rows === 1) {
    let countOk = 0;

    if (userAnswer.data[0][0] === trueAnswer.data[0][0]) {
      countOk++;
    }
    if (userAnswer.data[0][1] === trueAnswer.data[0][1]) {
      countOk++;
    }
    if (countOk === 2) {
      return 1;
    }
    if (countOk === 1) {
      return 0; // Can change
    }
    if (countOk === 0) {
      return 0;
    }
  }

  // Table answer
  const userAnswerWithoutEmptyRows = eraseEmptyRowsFromTable(userAnswer);

  // Check table size
  if (
    userAnswerWithoutEmptyRows.rows !== trueAnswer.rows ||
    userAnswerWithoutEmptyRows.cols !== trueAnswer.cols
  ) {
    return 0;
  }

  // Check table
  for (let i = 0; i < trueAnswer.rows; i++) {
    for (let j = 0; j < trueAnswer.cols; j++) {
      if (userAnswerWithoutEmptyRows.data[i][j] !== trueAnswer.data[i][j]) {
        return 0;
      }
    }
  }
  return 1;
};
