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
