import { useDispatch, useSelector } from "react-redux";
import { setNumberEGEFilter } from "../../../redux/slices/bankFilterSlice";
import { TASK_NUMBERS_NAMES } from "./constants";

const BankFilter = () => {
  const filtersData = useSelector((state) => state.bankFIlter);
  const dispatch = useDispatch();

  return (
    <div>
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
    </div>
  );
};
export default BankFilter;
