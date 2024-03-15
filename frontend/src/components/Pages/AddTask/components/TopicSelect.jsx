const TopicSelect = ({ allTaskData, setAllTaskData }) => {
  return (
    <div>
      <span>
        {"Тема задачи "}
        <input
          value={allTaskData.topic}
          onChange={(e) => {
            setAllTaskData({ ...allTaskData, topic: e.target.value });
          }}
        ></input>
      </span>
    </div>
  );
};
export default TopicSelect;
