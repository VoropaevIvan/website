import FileView from "../../../Utils/FileView";

const AddFiles = ({
  setCurrentFile,
  delFile,
  files,
  saveFileOnServer,
  setIsSend,
  reload,
}) => {
  return (
    <div className="addfiles">
      <input
        key={reload}
        type="file"
        onChange={(e) => {
          setCurrentFile(e.target.files[0]);
          setIsSend(false);
        }}
      ></input>
      <button onClick={saveFileOnServer}>Отправить</button>
      <br></br>
      {files.map((file) => {
        return <FileView key={file} fileName={file} delFile={delFile} />;
      })}
    </div>
  );
};
export default AddFiles;
