import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const TinyEditor = () => {
  const editorRef = useRef(null);
  const [textContent, setTextContent] = useState("");

  const handleClickOnButton = () => {
    if (editorRef.current) {
      setTextContent(editorRef.current.getContent());
      console.log(textContent);
    }
  };

  const handleClickOnDBButton = async () => {
    try {
      await axios.post("http://localhost:5000/api/addtask", {
        text: editorRef.current.getContent(),
        answer: 1,
        number_ege: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function createMarkup(myContent) {
    return { __html: myContent };
  }
  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TINY_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          file_picker_types: "file image media",
          images_upload_url: "http://localhost:5000/api/addtext",
          height: 500,
          menubar: "file edit insert view format table tools help",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "codesample",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={handleClickOnButton}>Update</button>
      <button onClick={handleClickOnDBButton}>Send to DB</button>
      <h2>Как выглядит на сайте</h2>
      <div dangerouslySetInnerHTML={createMarkup(textContent)} />
      <h2>HTML</h2>
      <div>{textContent}</div>
    </>
  );
};

export default TinyEditor;
