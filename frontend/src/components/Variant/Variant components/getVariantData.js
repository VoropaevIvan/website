const getVariantData = (varId) => {
  const typeAns = (type) => {
    if (type === 0) {
      return "text";
    }
    if (type === 1) {
      return "two";
    }
    if (type === 2) {
      return "table";
    }
  };
  console.log("Load data");
  const data = [];
  for (let i = 1; i < 28; i++) {
    data.push({
      content: "Условие задачи " + i + "  " + typeAns(i % 3),
      answer: i,
      typeAnswer: typeAns(i % 3),
    });
  }
  return data;
};
export default getVariantData;
