import {
  ALL_ACTUALITY,
  ALL_DIFFICULTY,
  ALL_STATUS,
  NOT_AND_OFFICIAL_TASK,
  NOT_SOLVE_TASKS,
  OFFICIAL_TASK,
  OK_TASKS,
  WA_TASKS,
} from "../../../Pages/constants";
import { ABSENT, FIRST_TRY_RIGHT, RIGHT, WRONG } from "../Task/constantsTask";
import { ALL_VARIANTS_TASK_NUMBER } from "./constants";

const prepareSolveStatus = (status) => {
  if (status === ABSENT) {
    return NOT_SOLVE_TASKS;
  }
  if (status === RIGHT || status === FIRST_TRY_RIGHT) {
    return OK_TASKS;
  }
  if (status === WRONG) {
    return WA_TASKS;
  }
};

const FilterFunction = (task, filtersData) => {
  let decision = 1;

  // Number EGE
  if (filtersData.numberEGE === ALL_VARIANTS_TASK_NUMBER) {
    decision *= 1;
  } else {
    if (task.numberEGE === filtersData.numberEGE) {
      decision *= 1;
    } else {
      decision *= 0;
    }
  }

  // Is official
  if (filtersData.isOfficial === NOT_AND_OFFICIAL_TASK) {
    decision *= 1;
  } else {
    if (
      task.isOfficial ===
      (filtersData.isOfficial === OFFICIAL_TASK ? true : false)
    ) {
      decision *= 1;
    } else {
      decision *= 0;
    }
  }

  // Number EGE
  if (filtersData.actuality === ALL_ACTUALITY) {
    decision *= 1;
  } else {
    if (task.actuality === filtersData.actuality) {
      decision *= 1;
    } else {
      decision *= 0;
    }
  }

  // Task difficulty
  if (filtersData.difficulty === ALL_DIFFICULTY) {
    decision *= 1;
  } else {
    if (task.difficulty === filtersData.difficulty) {
      decision *= 1;
    } else {
      decision *= 0;
    }
  }

  // Task status
  if (filtersData.solveStatus === ALL_STATUS) {
    decision *= 1;
  } else {
    if (prepareSolveStatus(task.userAnswer) === filtersData.solveStatus) {
      decision *= 1;
    } else {
      decision *= 0;
    }
  }

  return decision;
};
export default FilterFunction;
