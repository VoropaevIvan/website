import { useDispatch, useSelector } from "react-redux";
import { setNumberEGEFilter } from "../../../redux/slices/bankFilterSlice";

const BankFilter = () => {
  const filtersData = useSelector((state) => state.bankFIlter);
  const dispatch = useDispatch();
  return (
    <div>
      {"Номер ЕГЭ "}
      <select
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(setNumberEGEFilter(e.target.value));
          //setAllTaskData({ ...allTaskData, numberEGE: e.target.value });
        }}
        value={filtersData.numberEGE}
      >
        {[
          "Все",
          "№ 1",
          "№ 2",
          "№ 3",
          "№ 4",
          "№ 5",
          "№ 6",
          "№ 7",
          "№ 8",
          "№ 9",
          "№ 10",
          "№ 11",
          "№ 12",
          "№ 13",
          "№ 14",
          "№ 15",
          "№ 16",
          "№ 17",
          "№ 18",
          "№ 19-21",
          "№ 22",
          "№ 23",
          "№ 24",
          "№ 25",
          "№ 26",
          "№ 27",
        ].map((s) => {
          return <option key={s}>{s}</option>;
        })}
      </select>
    </div>
  );
};
export default BankFilter;
