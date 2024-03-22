export const getTopUsersByWeek = async () => {
  const data = [
    { name: "Иван", surname: "Воропаев", position: 1, balls: 120 },
    { name: "Владислав", surname: "Самсонов", position: 2, balls: 98 },
    { name: "Даниил", surname: "Костин", position: 3, balls: 90 },
    { name: "Артём", surname: "Дзюба", position: 4, balls: 76 },
    { name: "Юрий", surname: "Лодыгин", position: 5, balls: 23 },
  ];
  return data;
};

export const getTopUsersByMonth = async () => {
  const data = [
    { name: "Владислав", surname: "Самсонов", position: 1, balls: 598 },
    { name: "Иван", surname: "Воропаев", position: 2, balls: 456 },
    { name: "Даниил", surname: "Костин", position: 3, balls: 214 },
    { name: "Артём", surname: "Дзюба", position: 4, balls: 76 },
    { name: "Юрий", surname: "Лодыгин", position: 5, balls: 50 },
  ];
  return data;
};
