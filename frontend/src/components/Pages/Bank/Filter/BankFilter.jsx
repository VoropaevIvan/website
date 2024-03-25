import { useDispatch, useSelector } from "react-redux";
import {
  setActualityFilter,
  setDifficultyFilter,
  setIsOfficialFilter,
  setNumberEGEFilter,
  setSortingFilter,
} from "../../../../redux/slices/bankFilterSlice";
import { TASK_NUMBERS_NAMES } from "./constants";
import "./BankFilter.css";
import {
  ACTUAL,
  ALL_ACTUALITY,
  ALL_DIFFICULTY,
  EASY_THEN_EGE,
  GROB,
  LEVEL_OF_EGE,
  LITTLE_HARD_THEN_EGE,
  MUCH_EASY_THEN_EGE,
  NOT_ACTUAL,
  NOT_AND_OFFICIAL_TASK,
  NOT_OFFICIAL_TASK,
  OFFICIAL_TASK,
  WILL_BE_IN_EGE,
} from "../../../Pages/constants";

const BankFilter = () => {
  const filtersData = useSelector((state) => state.bankFilter);
  const dispatch = useDispatch();

  return (
    <div className="bankfilter">
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

      <span>{"Официальная задача?"}</span>
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

      <span>{"Актуальность задачи"}</span>
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

      <span>{"Сложность задачи"}</span>
      <select
        onChange={(e) => {
          dispatch(setDifficultyFilter(e.target.value));
        }}
        value={filtersData.difficulty}
      >
        <option>{ALL_DIFFICULTY}</option>
        <option>{LEVEL_OF_EGE}</option>
        <option>{MUCH_EASY_THEN_EGE}</option>
        <option>{EASY_THEN_EGE}</option>;<option>{LITTLE_HARD_THEN_EGE}</option>
        <option>{GROB}</option>;
      </select>

      <span>{"Сортировка"}</span>
      <select
        onChange={(e) => {
          dispatch(setSortingFilter(e.target.value));
        }}
        value={filtersData.sorting}
      >
        <option>Сначала новые</option>;<option>Сначала старые</option>;
      </select>
    </div>
  );
};
export default BankFilter;
