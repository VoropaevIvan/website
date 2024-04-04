import { useSelector } from "react-redux";
import TableVarResults from "./components/TableVarResults";
import "./VariantResults.css";
import { getVariantResults } from "../../../server/serverVariant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VariantResults = () => {
  const variantName = useParams()["id"];

  // const varData = useSelector((state) => state.variant.data);
  // const curAnswers = useSelector((state) => state.variant.answers);

  // console.log(curAnswers);
  const [varData, setVarData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const [testScore, setTestScore] = useState(0);
  const [firstScore, setFirstScore] = useState(0);
  const [countUserAns, setCountUserAns] = useState(0);
  const [isEGEFormat, setIsEGEFormat] = useState(true);
  const [maxBall, setMaxBall] = useState(0);

  const countTasks = varData.length;

  useEffect(() => {
    async function fetchData() {
      const res = await getVariantResults({ variantName });
      setVarData(res.varData);
      setUserAnswers(res.userAnswers);
      setCountUserAns(res.countUserAns);
      setTestScore(res.testScore);
      setFirstScore(res.firstScore);
      setIsEGEFormat(res.isEGEFormat);
      setMaxBall(res.maxBall);
    }

    fetchData();
  }, []);

  console.log("Vardata", varData);
  console.log("Useranswers", userAnswers);

  if (countTasks === 0) {
    return <div className="variantresults"></div>;
  }

  return (
    <div className="variantresults">
      <h1>{variantName}</h1>
      <div className="varrescont">
        <div className="varresball">
          <div className="varresscorecont">
            {isEGEFormat && (
              <>
                <p className="testscorehead">Тестовый балл</p>
                <p className="testscore">{testScore} / 100</p>

                <p className="firstscorehead">
                  {"Первичный балл: " + firstScore + " / 29."}
                </p>
              </>
            )}
            {!isEGEFormat && (
              <>
                <p className="testscorehead">Набрано баллов</p>
                <p className="testscore">
                  {firstScore + " / " + maxBall + "."}
                </p>
              </>
            )}
          </div>
          <div className="countans">
            <p>{"Дано ответов " + countUserAns + " / " + countTasks + "."}</p>
          </div>
        </div>
        <div className="varrestable">
          <TableVarResults varData={varData} curAnswers={userAnswers} />
        </div>
      </div>
    </div>
  );
};

export default VariantResults;
