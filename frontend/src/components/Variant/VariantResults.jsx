import { useSelector } from "react-redux";
import {
  eraseEmptyRowsFromTable,
  tableToTags,
} from "../Utils/addTaskUtils/variantUtils";
import "./VariantResults.css";
const VariantResults = () => {
  const varData = useSelector((state) => state.variant.data);
  const curAnswers = useSelector((state) => state.variant.answers);

  const prepareAnswer = (ans, type, ind) => {
    if (type === "text") {
      if (ans) {
        return <p key={ind}>{ans}</p>;
      } else {
        return <p key={ind}>-</p>;
      }
    }
    if (type === "two") {
      if (ans) {
        return tableToTags(ans, ind);
      } else {
        return <p key={ind}>-</p>;
      }
    }
    if (type === "table") {
      if (ans) {
        return tableToTags(eraseEmptyRowsFromTable(ans), ind);
      } else {
        return <p key={ind}>-</p>;
      }
    }
  };

  const answerDecision = (x, y) => {
    if (x) {
      if (String(x) === String(y)) {
        return "trueanswer";
      } else {
        return "wronganswer";
      }
    }
    return "noanswer";
  };
  return (
    <>
      <h1>Результаты</h1>
      <table>
        <tbody>
          <tr>
            <td>Номер</td>
            <td>Ваш ответ</td>
            <td>Правильный ответ</td>
          </tr>
          {varData.map((el, i) => {
            return (
              <tr key={i}>
                <td
                  className={answerDecision(
                    curAnswers[i],
                    varData[i]["answer"]["data"]
                  )}
                >
                  {i + 1}
                </td>
                <td>{prepareAnswer(curAnswers[i], varData[i].typeAnswer)}</td>
                <td>{varData[i]["answer"]["data"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default VariantResults;
