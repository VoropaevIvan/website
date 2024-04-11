import { useEffect, useState } from "react";

import {
  getStatByNumberEGE,
  getVariantsBestHistory,
} from "../../server/serverLk";
import StatByNumber from "./components/StatByNumber";
import VariantsResults from "./components/VariantsResults";
import TopUsers from "../MainPage/components/TopUsers";
import { prepareVarHistForLk } from "./components/lkUtils";

import "./Lk.css";

const Lk = () => {
  const [statByNumberEGE, setStatByNumberEGE] = useState([]);
  const [variantsHistory, setVariantsHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getStatByNumberEGE();
      setStatByNumberEGE(data);

      const varHistory = await getVariantsBestHistory();
      const varHistoryOk = prepareVarHistForLk(varHistory.data);
      setVariantsHistory(varHistoryOk);
    }
    fetchData();
  }, []);

  return (
    <div className="lk">
      <VariantsResults variantsHistory={variantsHistory} />
      <StatByNumber statByNumberEGE={statByNumberEGE} />

      <TopUsers />
    </div>
  );
};
export default Lk;
