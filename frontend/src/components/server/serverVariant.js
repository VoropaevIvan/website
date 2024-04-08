import axios from "axios";

import { parseTaskFromServer } from "../Utils/addTaskUtils/addTaskUtils";

export const getAllVariants = async () => {
  try {
    const link = process.env.REACT_APP_LINK_VARIANTS;
    const res = await axios.get(link);
    console.log(res);

    return res.data;
  } catch (error) {
    alert("Не удалось загрузить варианты. Попробуйте позже.");
    return [];
  }
};

export const createVariantByName = async ({ newVariantName }) => {
  try {
    const link = process.env.REACT_APP_LINK_VARIANT;
    const res = await axios.post(
      link + newVariantName,
      { tasks: [], maxScore: 29, isEGEFormat: true },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
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

export const getVariantResults = async ({ variantName }) => {
  try {
    const link =
      process.env.REACT_APP_VARIANT_SOLVE_HISTORY + `${variantName}?type=last`;
    const res = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const varResults = res.data;
    const answers = varResults.answers.map((ans) => {
      let okAns = ans;
      if (ans.rightAnswer.cols !== 0 || ans.rightAnswer.cols !== 0) {
        okAns.rightAnswer.data = JSON.parse(okAns.rightAnswer.data);
      }
      if (ans?.userAnswer?.cols && ans?.userAnswer?.cols) {
        if (ans.userAnswer.cols !== 0 || ans.userAnswer.cols !== 0) {
          okAns.userAnswer.data = JSON.parse(okAns.userAnswer.data);
        }
      }

      return { ...okAns };
    });

    let countUserAns = 0;
    answers.map((ans) => {
      if (ans.userAnswer !== null) {
        countUserAns += 1;
      }
      return 1;
    });

    return {
      userAnswers: answers,
      variantName,
      countUserAns: countUserAns,
      testScore: varResults.scoresEGE,
      firstScore: varResults.primaryScores,
      isEGEFormat: varResults.isEGEFormat,
      maxBall: varResults.maxScore,
    };
  } catch (error) {
    alert("Не удалось загрузить результаты варианта.");
    return {
      userAnswers: [],
      variantName: "",
      countUserAns: 0,
      testScore: 0,
      firstScore: 0,
      isEGEFormat: 0,
      maxBall: 0,
    };
  }
};

export const saveVariantOnServer = async ({
  variantName,
  answers,
  isEGEFormat,
  scoresEGE,
  primaryScores,
}) => {
  try {
    const link = process.env.REACT_APP_SEND_VARIANT_SOLVE;

    const res = await axios.post(
      link,
      { variantName, answers, isEGEFormat, scoresEGE, primaryScores },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
  } catch (error) {
    alert("Вариант не отправлен.");
  }
};
