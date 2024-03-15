const VideoReviewSelect = ({ allTaskData, setAllTaskData }) => {
  return (
    <div className="videorazbor">
      <span>
        Видеоразбор
        <input
          value={allTaskData.videoReview}
          onChange={(e) => {
            setAllTaskData({ ...allTaskData, videoReview: e.target.value });
          }}
        ></input>
      </span>
    </div>
  );
};
export default VideoReviewSelect;
