import {
  EASY_THEN_EGE,
  GROB,
  LEVEL_OF_EGE,
  LITTLE_HARD_THEN_EGE,
  MUCH_EASY_THEN_EGE,
} from "../../constants";

const DifficultySelect = ({ allTaskData, setAllTaskData }) => {
  return (
    <div>
      <span>
        {"Сложность задачи "}
        <select
          value={allTaskData.difficulty}
          onChange={(e) => {
            setAllTaskData({
              ...allTaskData,
              difficulty: e.target.value,
            });
          }}
        >
          <option>{GROB}</option>
          <option>{LITTLE_HARD_THEN_EGE}</option>
          <option>{LEVEL_OF_EGE}</option>
          <option>{EASY_THEN_EGE}</option>
          <option>{MUCH_EASY_THEN_EGE}</option>
        </select>
      </span>
    </div>
  );
};
export default DifficultySelect;
