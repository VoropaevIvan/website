import { LiaFileDownloadSolid } from "react-icons/lia";

const VarFooter = ({
  valueInAnswerInput,
  varData,
  curTaskNumber,
  InputForAnswer,
  setValueInAnswerInput,
}) => {
  return (
    <>
      <div className="varfiles">
        {["9.xls", "9.txt", "9.xslx", "9.ods"].map((file, i) => {
          return (
            <div
              onClick={() => {
                console.log("download");
              }}
              className="fileandimg"
              key={i}
            >
              <LiaFileDownloadSolid className="fileimg" />
              {file}
            </div>
          );
        })}
      </div>

      <div className="varAnswer">
        {varData &&
          varData[curTaskNumber] &&
          varData[curTaskNumber]["typeAnswer"] &&
          varData[curTaskNumber]["typeAnswer"] === "text" && (
            <InputForAnswer
              valueInAnswerInput={valueInAnswerInput}
              setValueInAnswerInput={setValueInAnswerInput}
            ></InputForAnswer>
          )}
      </div>
    </>
  );
};

export default VarFooter;
