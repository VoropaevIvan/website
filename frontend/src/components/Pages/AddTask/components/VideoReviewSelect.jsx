const VideoReviewSelect = ({ allTaskData, setAllTaskData, setIsSend }) => {
  return (
    <div className="videorazbor">
      <span>
        Видеоразбор
        <input
          value={allTaskData.videoReview}
          onChange={(e) => {
            setAllTaskData({ ...allTaskData, videoReview: e.target.value });
            setIsSend(false);
          }}
        ></input>
      </span>
    </div>
  );
};
export default VideoReviewSelect;
