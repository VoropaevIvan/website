import { ALL_VARIANTS } from "./constants";

const FilterFunction = (task, filtersData) => {
  if (filtersData.numberEGE === ALL_VARIANTS) {
    return true;
  }

  if (task.numberEGE === filtersData.numberEGE) {
    return true;
  } else {
    return false;
  }
};
export default FilterFunction;
