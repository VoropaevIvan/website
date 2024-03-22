import { useEffect, useState } from "react";
import {
  getTopUsersByMonth,
  getTopUsersByWeek,
} from "../../../server/serverTopUsers";
import TableForTopUsers from "./TableForTopUsers";
import "./TopUsers.css";

const TopUsers = () => {
  const [topUsersByWeek, setTopUsersByWeek] = useState([]);
  const [topUsersByMonth, setTopUsersByMonth] = useState([]);

  useEffect(() => {
    async function fetchData() {
      getTopUsersByWeek().then((topUsers) => {
        setTopUsersByWeek(topUsers);
      });
      getTopUsersByMonth().then((topUsers) => {
        setTopUsersByMonth(topUsers);
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <TableForTopUsers title={"Топ за неделю"} users={topUsersByWeek} />
      <TableForTopUsers title={"Топ за месяц"} users={topUsersByMonth} />
    </div>
  );
};

export default TopUsers;
