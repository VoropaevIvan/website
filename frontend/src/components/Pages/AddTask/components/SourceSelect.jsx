const SourceSelect = ({ allTaskData, setAllTaskData, setIsSend }) => {
  return (
    <span>
      {"Откуда задача "}
      <input
        value={allTaskData.source}
        onChange={(e) => {
          setAllTaskData({ ...allTaskData, source: e.target.value });
          setIsSend(false);
        }}
      ></input>
    </span>
  );
};
export default SourceSelect;
