import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import MenuBar from "./MenuBar";
import { useEffect } from "react";

const Tiptap = ({ description, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // bold: {
        //   HTMLAttributes: {
        //     class: "text-sky-300",
        //   },
        // },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose max-w-none bg-white py-3 px-4 rounded-b-lg h-80 overflow-y-auto",
      },
    },
    content: description,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="overflow-hidden rounded-lg border  border-black">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
