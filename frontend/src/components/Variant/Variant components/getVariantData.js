const getVariantData = (varId) => {
  console.log("Load data");
  const data = [];
  for (let i = 1; i < 28; i++) {
    data.push({
      content: "Условие задачи " + i,
      answer: i,
      typeAnswer: i === 2 ? "table" : "text",
    });
  }
  return data;
};
export default getVariantData;
