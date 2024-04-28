const HiddenInBank = ({ allTaskData, setAllTaskData, setIsSend }) => {
  return (
    <div>
      <form>
        <span>Убрать из банка </span>
        <input
          className="checkbox"
          type="checkbox"
          checked={allTaskData.hiddenInBank}
          onChange={(e) => {
            setAllTaskData({
              ...allTaskData,
              hiddenInBank: !allTaskData.hiddenInBank,
            });
          }}
        ></input>
      </form>
    </div>
  );
};

export default HiddenInBank;
