const StatByNumber = ({ statByNumberEGE }) => {
  console.log(statByNumberEGE);
  return (
    <div className="statbynumber">
      <div className="capt">
        <h1>Статистика по номерам ЕГЭ</h1>
      </div>
      <div className="stattable">
        {statByNumberEGE && (
          <table>
            <thead>
              <tr>
                <td>№ ЕГЭ</td>
                <td>Решено задач</td>
                <td>Процент решения</td>
              </tr>
            </thead>
            <tbody>
              {statByNumberEGE.map((number) => {
                return (
                  <tr key={number.numberEGE}>
                    <td>{number.numberEGE}</td>
                    <td>{number.countAll}</td>
                    <td>{number.percent}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StatByNumber;
