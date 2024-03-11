export const tableToTags = (table, ind) => {
  const showResults = (data) => {
    return (
      <table>
        <tbody>
          {data.map((el, i) => {
            return (
              <tr key={i}>
                {el.map((x, j) => {
                  return <td key={j}>{x}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return showResults(table["data"]);
};

export const eraseEmptyRowsFromTable = (table) => {
  const newTable = [];
  let start = 1;
  for (let i = table.data.length - 1; i >= 0; i--) {
    let countEmpty = 0;

    for (var j in table.data[i]) {
      if (table.data[i][j] === "") {
        countEmpty++;
      }
    }
    if (countEmpty === table.data[i].length) {
      if (start === 1) {
        continue;
      } else {
        newTable.push(table.data[i]);
      }
    } else {
      start = 0;
      newTable.push(table.data[i]);
    }
  }

  newTable.reverse();
  return { data: newTable, cols: table.cols, rows: newTable.length };
};

export const prepareAnswerFields = ({
  curTaskNumber,
  curAnswers,
  varData,
  setValueInAnswerInput,
  valueInAnswerTable,
  valueInAnswerInput,
  createDataForTable,
  setValueInAnswerTable,
}) => {
  if (
    curTaskNumber !== null &&
    curAnswers &&
    curAnswers[curTaskNumber] &&
    varData
  ) {
    if (varData[curTaskNumber]["typeAnswer"] === "text") {
      if (curAnswers[curTaskNumber] && valueInAnswerInput === "") {
        setValueInAnswerInput(curAnswers[curTaskNumber]);
      }
    }
    if (varData[curTaskNumber]["typeAnswer"] !== "text") {
      if (curAnswers[curTaskNumber] && valueInAnswerTable?.default === true) {
        setValueInAnswerTable(curAnswers[curTaskNumber]);
      }
    }
  }

  if (varData[curTaskNumber]) {
    if (varData[curTaskNumber]["typeAnswer"] === "table") {
      if (6 !== valueInAnswerTable["rows"]) {
        if (curAnswers[curTaskNumber] === undefined) {
          setValueInAnswerTable({
            data: createDataForTable({ cols: 2, rows: 6 }),
            cols: 2,
            rows: 6,
            default: true,
          });
        }
      }
    }
  }
};
