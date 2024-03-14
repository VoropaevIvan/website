import { useDispatch, useSelector } from "react-redux";
import {
  setNumberEGEFilter,
  setSortingFilter,
} from "../../../redux/slices/bankFilterSlice";
import { TASK_NUMBERS_NAMES } from "./constants";
import sortFunction from "./sortFunction";
import "./BankFilter.css";

const BankFilter = () => {
  const filtersData = useSelector((state) => state.bankFIlter);
  const dispatch = useDispatch();

  return (
    <div className="bankfilter">
      {"Номер ЕГЭ "}
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
      {"Сортировка"}
      <select
        onChange={(e) => {
          dispatch(setSortingFilter(e.target.value));
        }}
        value={filtersData.sorting}
      >
        <option>data</option>;<option>numberEGE</option>;
      </select>
    </div>
  );
};
export default BankFilter;
