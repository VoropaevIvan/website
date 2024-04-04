import axios from "axios";
import { addTypeAnswerFieldForTasks } from "../Pages/Variant/Variant components/VariantUtils";
import { parseTaskFromServer } from "../Utils/addTaskUtils/addTaskUtils";

export const getAllVariants = async () => {
  try {
    const link = process.env.REACT_APP_LINK_VARIANTS;
    const res = await axios.get(link);
    return res;
  } catch (error) {
    alert("Не удалось загрузить варианты. Попробуйте позже.");
    return [];
  }
};

export const createVariantByName = async ({ newVariantName }) => {
  try {
    const link = process.env.REACT_APP_LINK_VARIANT;
    const res = await axios.post(link + newVariantName, [], {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return res;
  } catch (error) {
    alert("Не удалось создать вариант.");
  }
};

export const getVariantTasks = async ({ varId }) => {
  try {
    const link = process.env.REACT_APP_LINK_VARIANT;
    const res = await axios.get(link + varId);
    return res.data.map((task) => {
      return parseTaskFromServer(task);
    });
  } catch (error) {
    return [];
  }
};

export const getVariantResultsFromServer = async () => {
  return {
    answers: {
      0: { cols: 0, rows: 0, data: "10" },
      3: { cols: 0, rows: 0, data: "1" },
    },
    countUserAns: 20,
    testScore: 90,
    firstScore: 10,
    maxBall: 29,
    isEGEFormat: true,
  };
};

export const getVariantResults = async ({ variantName }) => {
  try {
    const varData = await getVariantTasks({ varId: variantName });
    const varDataWithTypeAnswer = addTypeAnswerFieldForTasks(varData);

    const varResults = await getVariantResultsFromServer();
    return {
      varData: varDataWithTypeAnswer,
      userAnswers: varResults.answers,
      variantName,
      countUserAns: varResults.countUserAns,
      testScore: varResults.testScore,
      firstScore: varResults.firstScore,
      isEGEFormat: varResults.isEGEFormat,
      maxBall: varResults.maxBall,
    };
  } catch (error) {}
};
