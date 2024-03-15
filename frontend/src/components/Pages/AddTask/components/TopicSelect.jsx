const TopicSelect = ({ allTaskData, setAllTaskData, setIsSend }) => {
  return (
    <div>
      <span>
        {"Тема задачи "}
        <input
          value={allTaskData.topic}
          onChange={(e) => {
            setAllTaskData({ ...allTaskData, topic: e.target.value });
            setIsSend(false);
          }}
        ></input>
      </span>
    </div>
  );
};
export default TopicSelect;
