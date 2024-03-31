import "./Table.css";

function Table({ rows, cols, setAnswer, data, disabled }) {
  const handleChangeinput = (i, j, value) => {
    const newData = [...data];
    newData[i][j] = value;
    setAnswer({ rows: rows, cols: cols, data: newData });
  };

  return (
    <table>
      <tbody>
        {data &&
          data.map((row, i) => {
            return (
              <tr key={"r" + i}>
                {row.map((key, j) => {
                  return (
                    <td key={"d" + j}>
                      <input
                        disabled={disabled}
                        type="text"
                        onChange={(e) => {
                          handleChangeinput(i, j, e.target.value);
                        }}
                        value={data[i][j]}
                      ></input>
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default Table;
