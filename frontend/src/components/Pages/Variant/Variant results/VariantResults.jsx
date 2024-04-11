import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TableVarResults from "./components/TableVarResults";
import { getVariantResults } from "../../../server/serverVariant";

import "./VariantResults.css";

const VariantResults = () => {
  const variantName = useParams()["id"];

  const navigate = useNavigate();

  const variantResultsFromRedux = useSelector(
    (state) => state.variant.variantResults
  );

  const [userAnswers, setUserAnswers] = useState([]);
  const [testScore, setTestScore] = useState(0);
  const [firstScore, setFirstScore] = useState(0);
  const [countUserAns, setCountUserAns] = useState(0);
  const [isEGEFormat, setIsEGEFormat] = useState(true);
  const [maxBall, setMaxBall] = useState(0);

  const countTasks = userAnswers.length;

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("jwt")) {
        // Auth user
        const res = await getVariantResults({ variantName });
        setUserAnswers(res.userAnswers);
        setCountUserAns(res.countUserAns);
        setTestScore(res.testScore);
        setFirstScore(res.firstScore);
        setIsEGEFormat(res.isEGEFormat);
        setMaxBall(res.maxBall);
      } else {
        // Not auth user
        if (variantResultsFromRedux.userAnswers) {
          setUserAnswers(variantResultsFromRedux.userAnswers);

          setTestScore(variantResultsFromRedux.scoresEGE);
          setFirstScore(variantResultsFromRedux.primaryScores);
          setIsEGEFormat(variantResultsFromRedux.isEGEFormat);
          setMaxBall(variantResultsFromRedux.maxBall);

          let countUserAns = 0;
          variantResultsFromRedux.userAnswers.map((ans) => {
            if (ans.userAnswer !== null) {
              countUserAns += 1;
            }
            return 1;
          });
          setCountUserAns(countUserAns);
        }
      }
    }

    fetchData();
  }, [variantName, variantResultsFromRedux]);

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
          <TableVarResults data={userAnswers} />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("../variant/" + variantName);
          }}
          className="backtovarbutton"
        >
          Вернуться к варианту
        </button>
      </div>
    </div>
  );
};

export default VariantResults;
