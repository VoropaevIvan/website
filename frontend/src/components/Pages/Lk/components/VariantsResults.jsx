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
  const showVariant = (variant) => {
    return (
      <div className="tablevar">
        <h3>{variant.name}</h3>
        <table>
          <thead>
            <tr>
              <td>№</td>
              {variant.tasksResults.map((task, i) => {
                return <td>{i + 1}</td>;
              })}
              <td>Итого</td>
            </tr>
          </thead>
          <tbody>
            <td>Результат</td>
            {variant.tasksResults.map((task, i) => {
              return <td className={decisionClass(task)}>{task}</td>;
            })}
            <td>{variant.score}</td>
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
        variantsHistory.map((variant) => {
          return showVariant(variant);
        })}
    </div>
  );
};
export default VariantsResults;
