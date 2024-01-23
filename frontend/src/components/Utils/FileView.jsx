function FileView({ fileName, delFile }) {
  return (
    <div>
      <strong>{fileName}</strong>
      <button
        onClick={() => {
          delFile(fileName);
        }}
      >
        Удалить
      </button>
    </div>
  );
}

export default FileView;
