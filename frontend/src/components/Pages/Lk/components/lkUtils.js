export const prepareVarHistForLk = (varHistory) => {
  console.log(varHistory);
  const res = varHistory.map((variant) => {
    const answersRes = [];
    for (const key in variant.answers) {
      console.log(variant.answers[key].userAnswer);
      if (variant.answers[key].userAnswer === null) {
        answersRes.push("-");
      } else if (variant.answers[key].scores === 1) {
        answersRes.push("1");
      } else if (variant.answers[key].scores === 2) {
        answersRes.push("2");
      } else if (variant.answers[key].scores === 0) {
        answersRes.push("0");
      }
    }
    return {
      name: variant.variantName,
      score: variant.scoresEGE,
      tasksResults: answersRes,
    };
  });

  return res;
};
