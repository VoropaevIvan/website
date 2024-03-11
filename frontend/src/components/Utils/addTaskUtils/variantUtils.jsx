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
