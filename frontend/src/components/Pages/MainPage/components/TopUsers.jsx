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

      try {
        setTopUsersByWeek(topUsers.week);
        setTopUsersByMonth(topUsers.month);
      } catch (error) {}
    }
    fetchData();
  }, [location]);

  console.log(topUsersByWeek);
  return (
    <>
      {topUsersByWeek.length > 0 && (
        <div>
          <h1>Лучшие пользователи сайта</h1>
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
