const IsOfficialSelect = ({ allTaskData, setAllTaskData }) => {
  return (
    <div>
      <span>
        {"Официальная задача? "}
        <select
          value={allTaskData.isOfficial ? "Да" : "Нет"}
          onChange={(e) => {
            setAllTaskData({
              ...allTaskData,
              isOfficial: e.target.value === "Да" ? true : false,
            });
          }}
        >
          <option>Да</option>
          <option>Нет</option>
        </select>
      </span>
    </div>
  );
};

export default IsOfficialSelect;
