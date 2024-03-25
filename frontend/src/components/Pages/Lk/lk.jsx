import { useEffect, useState } from "react";
import {
  getStatByNumberEGE,
  getVariantsResultsHistory,
} from "../../server/serverLk";
import "./Lk.css";
import StatByNumber from "./components/StatByNumber";
import VariantsResults from "./components/VariantsResults";
import TopUsers from "../MainPage/components/TopUsers";

const Lk = () => {
  const [statByNumberEGE, setStatByNumberEGE] = useState([]);
  const [variantsHistory, setVariantsHistory] = useState([]);

  useEffect(() => {
    async function fetchData(taskId) {
      const data = await getStatByNumberEGE();
      setStatByNumberEGE(data);
      const dataVars = await getVariantsResultsHistory();
      setVariantsHistory(dataVars);
    }
    fetchData();
  }, []);

  return (
    <div className="lk">
      <VariantsResults variantsHistory={variantsHistory} />
      <StatByNumber statByNumberEGE={statByNumberEGE} />

      <div className="capt">
        <h1>Лучшие пользователи сайта</h1>
      </div>

      <TopUsers />
    </div>
  );
};
export default Lk;
