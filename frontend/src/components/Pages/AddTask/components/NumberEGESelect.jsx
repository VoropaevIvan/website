import { NUMBERS_EGE_NAMES } from "../../constants";

const NumberEGESelect = ({ allTaskData, setAllTaskData, setIsSend }) => {
  return (
    <span>
      <p>
        {"Номер ЕГЭ "}
        <select
          onChange={(e) => {
            setAllTaskData({ ...allTaskData, numberEGE: e.target.value });
            setIsSend(false);
          }}
          value={allTaskData.numberEGE}
        >
          {NUMBERS_EGE_NAMES.map((s) => {
            return <option key={s}>{s}</option>;
          })}
        </select>
      </p>
    </span>
  );
};

export default NumberEGESelect;
