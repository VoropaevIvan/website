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
