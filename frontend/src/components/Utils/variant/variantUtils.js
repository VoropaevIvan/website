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
  if (userAnswer === undefined || userAnswer.data === null) {
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

export const firstToTestBalls = (firstBalls) => {
  const testBalls = [
    0, 7, 14, 20, 27, 34, 40, 43, 46, 48, 51, 54, 56, 59, 62, 64, 67, 70, 72,
    75, 78, 80, 83, 85, 88, 90, 93, 95, 98, 100,
  ];
  try {
    return testBalls[firstBalls];
  } catch (error) {
    return -1;
  }
};

export const calcFirstBalls = (answersWithDecision) => {
  let summFirstBalls = 0;
  for (const key in answersWithDecision) {
    if (answersWithDecision[key].scores > 0) {
      summFirstBalls += answersWithDecision[key].scores;
    }
  }
  return summFirstBalls;
};
