import { ACTUAL, NOT_ACTUAL, WILL_BE_IN_EGE } from "../../constants";

const ActualitySelect = ({ allTaskData, setAllTaskData, setIsSend }) => {
  return (
    <div>
      <span>
        {"Актуальность задачи "}
        <select
          value={allTaskData.actuality}
          onChange={(e) => {
            setAllTaskData({
              ...allTaskData,
              actuality: e.target.value,
            });
            setIsSend(false);
          }}
        >
          <option>{WILL_BE_IN_EGE}</option>
          <option>{ACTUAL}</option>
          <option>{NOT_ACTUAL}</option>
        </select>
      </span>
    </div>
  );
};
export default ActualitySelect;
