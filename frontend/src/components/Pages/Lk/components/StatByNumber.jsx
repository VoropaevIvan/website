const StatByNumber = ({ statByNumberEGE }) => {
  return (
    <div className="statbynumber">
      {statByNumberEGE && statByNumberEGE.length > 0 && (
        <>
          <div className="capt">
            <h2>Статистика по номерам ЕГЭ</h2>
          </div>

          <div className="stattable">
            <table>
              <thead>
                <tr>
                  <td>№ ЕГЭ</td>
                  <td>Решено задач</td>
                  <td>Процент решения с первой попытки</td>
                </tr>
              </thead>
              <tbody>
                {statByNumberEGE.map((number) => {
                  return (
                    <tr key={number.numberEGE}>
                      <td>{number.numberEGE}</td>
                      <td>{number.stats.solvedCount}</td>
                      <td>
                        {number.stats.solvedCount > 0
                          ? Math.ceil(
                              (number.stats.solvedFirstTryCount /
                                number.stats.solvedCount) *
                                100
                            )
                          : 0}
                        {" %"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default StatByNumber;
