import axios from "axios";

export const getStatByNumberEGE = async () => {
  try {
    const link = process.env.REACT_APP_STATS_BY_NUMBER_EGE;
    const res = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    return res.data;
  } catch (error) {
    return [];
  }
};

// export const getVariantsResultsHistory = async () => {
//   const variantNames = ["Сентябрьский", "Октябрьский", "Ноябрьский"];
//   const variantScores = [70, 60, 68];
//   const variants = [];
//   for (let i = 1; i < 4; i++) {
//     const variant = {
//       name: variantNames[i - 1],
//       score: variantScores[i - 1],
//       tasksResults: [],
//     };

//     for (let j = 1; j < 28; j++) {
//       if ((j + i) % 3 === 0) {
//         variant.tasksResults.push("1");
//       }
//       if ((j + i) % 3 === 1) {
//         variant.tasksResults.push("-");
//       }
//       if ((j + i) % 3 === 2) {
//         variant.tasksResults.push("0");
//       }
//     }
//     variants.push(variant);
//   }
//   return variants;
// };

export const getVariantsBestHistory = async () => {
  const link = process.env.REACT_APP_HISTORY_VARIANTS;
  const res = await axios.get(link, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  return res;
};
