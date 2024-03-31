export const countUserAns = (curAnswers, length) => {
  let count = 0;
  for (let i = 0; i < length; i++) {
    if (curAnswers[i]) {
      count++;
    }
  }
  return count;
};
