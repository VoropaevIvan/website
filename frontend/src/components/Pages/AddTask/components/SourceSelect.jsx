const SourceSelect = ({ allTaskData, setAllTaskData }) => {
  return (
    <span>
      {"Откуда задача "}
      <input
        value={allTaskData.source}
        onChange={(e) => {
          setAllTaskData({ ...allTaskData, source: e.target.value });
        }}
      ></input>
    </span>
  );
};
export default SourceSelect;
