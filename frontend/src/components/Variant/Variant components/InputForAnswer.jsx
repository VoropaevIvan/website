import { useDispatch, useSelector } from "react-redux";
import { clearAnswer, setAnswer } from "../../../redux/slices/variantSlice";

const InputForAnswer = ({ valueInAnswerInput, setValueInAnswerInput }) => {
  //const [valueInAnswerInput, setValueInAnswerInput] = useState("");
  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const curAnswers = useSelector((state) => state.variant.answers);
  const curAnswer = curAnswers[curTaskNumber] ? curAnswers[curTaskNumber] : "";

  const dispatch = useDispatch();
  const handleSaveButtonClick = () => {
    dispatch(
      setAnswer({ taskNumber: curTaskNumber, newAnswer: valueInAnswerInput })
    );
  };
  const handleClearAnswerButtonClick = () => {
    dispatch(clearAnswer(curTaskNumber));
    setValueInAnswerInput("");
  };

  return (
    <>
      <input
        value={valueInAnswerInput}
        onChange={(e) => {
          setValueInAnswerInput(e.target.value);
        }}
        disabled={curAnswer.length > 0}
      ></input>
      <button
        onClick={handleSaveButtonClick}
        disabled={(valueInAnswerInput.length === 0) | (curAnswer.length > 0)}
      >
        Сохранить
      </button>
      <button onClick={handleClearAnswerButtonClick}>Очистить</button>
    </>
  );
};

export default InputForAnswer;
