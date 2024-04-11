import {
  eraseEmptyRowsFromTable,
  tableToTags,
} from "../../../../Utils/addTaskUtils/variantUtils";
import { checkAnswer } from "../../../../Utils/variant/variantUtils";

import "./TableVarResults.css";

const TableVarResults = ({ data }) => {
  const prepareAnswer = (ans, ind) => {
    if (ans == null) {
      return <p key={ind}>-</p>;
    }

    let type = "table";
    if (ans.cols === 0 && ans.rows === 0) {
      type = "text";
    }
    if (ans.cols === 2 && ans.rows === 1) {
      type = "two";
    }

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

    if (res === -1) {
      return "noanswer";
    }
    if (res === 1) {
      return "trueanswer";
    }
    if (res === 0) {
      return "wronganswer";
    }
  };

  return (
    <table className="variantrestable">
      <tbody>
        <tr className="maintr">
          <td>Номер</td>
          <td>Ваш ответ</td>
          <td>Правильный ответ</td>
          <td>Балл</td>
        </tr>
        {data.map((el, i) => {
          return (
            <tr key={i}>
              <td
                className={answerDecision(
                  data[i].userAnswer,
                  data[i].rightAnswer
                )}
              >
                {i + 1}
              </td>
              <td>{prepareAnswer(data[i].userAnswer, i)}</td>
              <td>{data[i] && prepareAnswer(data[i].rightAnswer, i)}</td>
              <td>{el.scores}</td>
              {/* <td>{varData[i]["answer"]["data"]}</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableVarResults;
