import { useDispatch, useSelector } from "react-redux";
import { clearAnswer, setAnswer } from "../../../../redux/slices/variantSlice";
import "./InputForAnswer.css";

const InputForAnswer = ({ valueInAnswerInput, setValueInAnswerInput }) => {
  const dispatch = useDispatch();

  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const curAnswers = useSelector((state) => state.variant.answers);

  const curAnswer = curAnswers[curTaskNumber]
    ? curAnswers[curTaskNumber]
    : {
        cols: 0,
        rows: 0,
        data: "",
      };

  const disabledSaveBut =
    (valueInAnswerInput.data.length === 0) | (curAnswer.data.length > 0);

  const isSavedAnswer = curAnswer.data.length > 0;

  const handleSaveButtonClick = () => {
    dispatch(
      setAnswer({ taskNumber: curTaskNumber, newAnswer: valueInAnswerInput })
    );
  };
  const handleClearAnswerButtonClick = () => {
    dispatch(clearAnswer(curTaskNumber));
    setValueInAnswerInput({
      cols: 0,
      rows: 0,
      data: "",
    });
  };

  return (
    <>
      <input
        value={valueInAnswerInput.data}
        onChange={(e) => {
          setValueInAnswerInput({
            cols: 0,
            rows: 0,
            data: e.target.value,
          });
        }}
        disabled={curAnswer.data.length > 0}
      ></input>

      <div className="clearsavebut">
        {isSavedAnswer && (
          <button
            className="clearbutton "
            onClick={handleClearAnswerButtonClick}
          >
            Очистить
          </button>
        )}

        <button
          className={disabledSaveBut ? "savebuttondis" : "savebutton"}
          onClick={handleSaveButtonClick}
          disabled={disabledSaveBut}
        >
          {isSavedAnswer ? "Ответ сохранён" : "Сохранить ответ"}
        </button>
      </div>
    </>
  );
};

export default InputForAnswer;
