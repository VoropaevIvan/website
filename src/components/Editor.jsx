import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";

import "react-quill/dist/quill.snow.css";

export const Editor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("Стартовый текст");

  //   const config = {
  //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //     placeholder: placeholder || "Start typings...",

  //     uploader: {
  //       url: "http://localhost:8181/index-test.php?action=fileUpload",
  //     },
  //     filebrowser: {
  //       ajax: {
  //         url: "http://localhost:8181/index-test.php",
  //       },
  //     },
  //   };
  const [myContent, setMyContent] = useState("");

  function createMarkup(myContent) {
    return { __html: myContent };
  }

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        //config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          console.log(newContent);
          setMyContent(newContent);
        }}
      />
      <div dangerouslySetInnerHTML={createMarkup(myContent)} />
    </div>
  );
};

export default Editor;
