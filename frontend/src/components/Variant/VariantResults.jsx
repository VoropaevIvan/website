import { useSelector } from "react-redux";
import { tableToTags } from "../Utils/addTaskUtils/variantUtils";

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
    if (type === "table" || type === "two") {
      if (ans) {
        return tableToTags(ans, ind);
      } else {
        return <p key={ind}>-</p>;
      }
    }
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
                <td>{i}</td>
                <td>{prepareAnswer(curAnswers[i], varData[i].typeAnswer)}</td>
                <td>10</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default VariantResults;
