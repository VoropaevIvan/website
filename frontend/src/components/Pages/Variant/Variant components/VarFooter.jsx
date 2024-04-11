import { LiaFileDownloadSolid } from "react-icons/lia";

const VarFooter = ({
  valueInAnswerInput,
  varData,
  curTaskNumber,
  InputForAnswer,
  setValueInAnswerInput,
}) => {
  const files = varData[curTaskNumber].files;
  const fileName = (name) => {
    const curNumberEGE = varData[curTaskNumber].numberEGE.split(" ")[1];
    const exp = name.split(".").reverse()[0];
    return curNumberEGE + "." + exp;
  };
  return (
    <>
      <div className="varfiles">
        {files.map((file, i) => {
          return (
            <div
              onClick={() => {
                window.open(file, "_blank");
              }}
              className="fileandimg"
              key={i}
            >
              <LiaFileDownloadSolid className="fileimg" />
              {fileName(file)}
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
