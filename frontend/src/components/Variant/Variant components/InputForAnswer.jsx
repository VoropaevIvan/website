import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../../../redux/slices/variantSlice";
import { useState } from "react";

const InputForAnswer = ({ valueInAnswerInput, setValueInAnswerInput }) => {
  //const [valueInAnswerInput, setValueInAnswerInput] = useState("");
  const curTaskNumber = useSelector((state) => state.variant.currentTask);
  const curAnswers = useSelector((state) => state.variant.answers);
  let curAnswer = "";

  const dispatch = useDispatch();
  const handleSaveButtonClick = () => {
    dispatch(
      setAnswer({ taskNumber: curTaskNumber, newAnswer: valueInAnswerInput })
    );
  };

  if (curAnswers[curTaskNumber]) {
    curAnswer = curAnswers[curTaskNumber];
  }
  console.log(curAnswer);
  return (
    <>
      <input
        value={valueInAnswerInput}
        onChange={(e) => {
          setValueInAnswerInput(e.target.value);
        }}
        disabled={curAnswer.length > 0}
      ></input>
      <button onClick={handleSaveButtonClick}>Сохранить</button>
      <button>Отменить</button>
    </>
  );
};

export default InputForAnswer;
