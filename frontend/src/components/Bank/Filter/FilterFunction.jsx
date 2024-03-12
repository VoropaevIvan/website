const FilterFunction = (task, filtersData) => {
  if (filtersData.numberEGE === "Все") {
    return true;
  }
  console.log(task.numberEGE, filtersData.numberEGE);
  if (task.numberEGE === filtersData.numberEGE) {
    return true;
  } else {
    return false;
  }
  //return true;
};
export default FilterFunction;
