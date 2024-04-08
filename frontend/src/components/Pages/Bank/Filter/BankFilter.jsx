import { useDispatch, useSelector } from "react-redux";
import {
  setActualityFilter,
  setDifficultyFilter,
  setIsOfficialFilter,
  setNumberEGEFilter,
  setSolveStatusFilter,
  setSortingFilter,
} from "../../../../redux/slices/bankFilterSlice";
import { TASK_NUMBERS_NAMES } from "./constants";
import "./BankFilter.css";
import {
  ACTUAL,
  ALL_ACTUALITY,
  ALL_DIFFICULTY,
  ALL_STATUS,
  EASY_THEN_EGE,
  GROB,
  LEVEL_OF_EGE,
  LITTLE_HARD_THEN_EGE,
  MUCH_EASY_THEN_EGE,
  NOT_ACTUAL,
  NOT_AND_OFFICIAL_TASK,
  NOT_OFFICIAL_TASK,
  NOT_SOLVE_TASKS,
  OFFICIAL_TASK,
  OK_TASKS,
  WA_TASKS,
  WILL_BE_IN_EGE,
} from "../../../Pages/constants";

const BankFilter = () => {
  const filtersData = useSelector((state) => state.bankFilter);
  const dispatch = useDispatch();

  return (
    <div className="bankfilter">
      <div className="block">
        <span>{"Номер ЕГЭ "}</span>
        <select
          onChange={(e) => {
            dispatch(setNumberEGEFilter(e.target.value));
          }}
          value={filtersData.numberEGE}
        >
          {TASK_NUMBERS_NAMES.map((s) => {
            return <option key={s}>{s}</option>;
          })}
        </select>
      </div>

      <div className="block">
        <span>{"Официальная задача? "}</span>
        <select
          onChange={(e) => {
            dispatch(setIsOfficialFilter(e.target.value));
          }}
          value={filtersData.isOfficial}
        >
          <option>{NOT_AND_OFFICIAL_TASK}</option>
          <option>{OFFICIAL_TASK}</option>
          <option>{NOT_OFFICIAL_TASK}</option>;
        </select>
      </div>

      <div className="block">
        <span>{"Актуальность задачи "}</span>
        <select
          onChange={(e) => {
            dispatch(setActualityFilter(e.target.value));
          }}
          value={filtersData.actuality}
        >
          <option>{ALL_ACTUALITY}</option>
          <option>{WILL_BE_IN_EGE}</option>
          <option>{ACTUAL}</option>
          <option>{NOT_ACTUAL}</option>;
        </select>
      </div>

      <div className="block">
        <span>{"Сложность задачи "}</span>
        <select
          onChange={(e) => {
            dispatch(setDifficultyFilter(e.target.value));
          }}
          value={filtersData.difficulty}
        >
          <option>{ALL_DIFFICULTY}</option>
          <option>{LEVEL_OF_EGE}</option>
          <option>{MUCH_EASY_THEN_EGE}</option>
          <option>{EASY_THEN_EGE}</option>;
          <option>{LITTLE_HARD_THEN_EGE}</option>
          <option>{GROB}</option>;
        </select>
      </div>

      <div className="block">
        <span>{"Статус задачи "}</span>
        <select
          onChange={(e) => {
            dispatch(setSolveStatusFilter(e.target.value));
          }}
          value={filtersData.solveStatus}
        >
          <option>{ALL_STATUS}</option>
          <option>{NOT_SOLVE_TASKS}</option>
          <option>{WA_TASKS}</option>
          <option>{OK_TASKS}</option>
        </select>
      </div>

      <div className="block">
        <span>{"Сортировка "}</span>
        <select
          onChange={(e) => {
            dispatch(setSortingFilter(e.target.value));
          }}
          value={filtersData.sorting}
        >
          <option>Сначала новые</option>;<option>Сначала старые</option>;
        </select>
      </div>
    </div>
  );
};
export default BankFilter;
