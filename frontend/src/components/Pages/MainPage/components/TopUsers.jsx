import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTopUsers } from "../../../server/serverTopUsers";
import TableForTopUsers from "./TableForTopUsers";
import "./TopUsers.css";

const TopUsers = () => {
  const location = useLocation();
  const [topUsersByWeek, setTopUsersByWeek] = useState([]);
  const [topUsersByMonth, setTopUsersByMonth] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const topUsers = await getTopUsers();

      if (topUsers?.week) {
        setTopUsersByWeek(topUsers.week);
      }
      if (topUsers?.month) {
        setTopUsersByMonth(topUsers.month);
      }
    }
    fetchData();
  }, [location]);

  return (
    <>
      {topUsersByWeek && topUsersByWeek.length > 0 && (
        <div className="capt">
          <h2>Лучшие пользователи сайта</h2>
        </div>
      )}

      <div className="topusers">
        <div>
          {topUsersByWeek.length > 0 && (
            <TableForTopUsers title={"Топ за неделю"} users={topUsersByWeek} />
          )}
        </div>
        <div>
          {topUsersByMonth.length > 0 && (
            <TableForTopUsers title={"Топ за месяц"} users={topUsersByMonth} />
          )}
        </div>
      </div>
    </>
  );
};

export default TopUsers;
