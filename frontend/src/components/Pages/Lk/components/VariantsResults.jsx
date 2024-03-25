const VariantsResults = ({ variantsHistory }) => {
  const decisionClass = (ans) => {
    if (ans === "0") {
      return "wa";
    }
    if (ans === "1") {
      return "ok";
    }
    if (ans === "-") {
      return "na";
    }
    return "";
  };
  const showVariant = (variant, i) => {
    return (
      <div key={i} className="tablevar">
        <h3>{variant.name}</h3>
        <table>
          <thead>
            <tr>
              <td>№</td>
              {variant.tasksResults.map((task, i) => {
                return <td key={i}>{i + 1}</td>;
              })}
              <td>Итого</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Результат</td>
              {variant.tasksResults.map((task, i) => {
                return (
                  <td key={i} className={decisionClass(task)}>
                    {task}
                  </td>
                );
              })}
              <td>{variant.score}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div className="variantsresults">
      <div className="capt">
        <h1>Результаты вариантов</h1>
      </div>

      {variantsHistory &&
        variantsHistory.map((variant, i) => {
          return showVariant(variant, i);
        })}
    </div>
  );
};
export default VariantsResults;
