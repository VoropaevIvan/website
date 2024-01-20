import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyEditor = ({ setText }) => {
  const editorRef = useRef(null);

  function myCustomOnChangeHandler() {
    setText(editorRef.current.getContent());
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
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; align:left }",
        }}
        onEditorChange={myCustomOnChangeHandler}
      />
    </>
  );
};

export default TinyEditor;
