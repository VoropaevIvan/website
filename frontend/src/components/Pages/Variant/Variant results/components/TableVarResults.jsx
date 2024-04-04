import {
  eraseEmptyRowsFromTable,
  tableToTags,
} from "../../../../Utils/addTaskUtils/variantUtils";
import { checkAnswer } from "../../../../Utils/variant/variantUtils";
import "./TableVarResults.css";

const TableVarResults = ({ varData, curAnswers }) => {
  const prepareAnswer = (ans, type, ind) => {
    if (type === "text") {
      let answer;

      if (ans?.data !== undefined) {
        answer = ans.data;
      } else {
        answer = ans;
      }

      if (ans) {
        return <p key={ind}>{answer}</p>;
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
    return <></>;
  };

  const answerDecision = (userAnswer, trueAnswer) => {
    if (userAnswer === undefined) {
      return "noanswer";
    }

    let userAnswerOk = userAnswer;
    if (userAnswer?.cols === undefined) {
      userAnswerOk = { cols: 0, rows: 0, data: userAnswer };
    }
    const res = checkAnswer(userAnswerOk, trueAnswer);
    console.log(userAnswerOk, trueAnswer, res);
    if (res === -1) {
      return "noanswer";
    }
    if (res === 1) {
      return "trueanswer";
    }
    if (res === 0) {
      return "wronganswer";
    }

    // if (x) {
    //   if (String(x) === String(y)) {
    //     return "trueanswer";
    //   } else {
    //     return "wronganswer";
    //   }
    // }
    // return "noanswer";
  };

  return (
    <table className="variantrestable">
      <tbody>
        <tr className="maintr">
          <td>Номер</td>
          <td>Ваш ответ</td>
          <td>Правильный ответ</td>
        </tr>
        {varData.map((el, i) => {
          return (
            <tr key={i}>
              <td
                className={answerDecision(curAnswers[i], varData[i]["answer"])}
              >
                {i + 1}
              </td>
              <td>{prepareAnswer(curAnswers[i], varData[i].typeAnswer, i)}</td>
              <td>
                {varData[i] &&
                  varData[i]["answer"] &&
                  varData[i].typeAnswer &&
                  prepareAnswer(varData[i]["answer"], varData[i].typeAnswer, i)}
              </td>
              {/* <td>{varData[i]["answer"]["data"]}</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableVarResults;
