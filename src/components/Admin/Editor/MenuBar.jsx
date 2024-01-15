import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-between bg-gray-100 p-2">
      <div className=" flex gap-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`rounded-md p-1  ${
            editor.isActive("bold") ? " bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <Bold strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`rounded-md p-1  ${
            editor.isActive("italic") ? " bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <Italic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`rounded-md p-1  ${
            editor.isActive("strike") ? " bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <Strikethrough />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded-md p-1 ${
            editor.isActive("heading", { level: 2 })
              ? " bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <Heading2 />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`rounded-md p-1 ${
            editor.isActive("heading", { level: 3 })
              ? " bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <Heading3 />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded-md p-1  ${
            editor.isActive("bulletList") ? " bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <List />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded-md p-1  ${
            editor.isActive("orderedList")
              ? " bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <ListOrdered />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 pr-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={`rounded-md p-1 ${
            !editor.can().chain().focus().undo().run()
              ? "opacity-50"
              : "hover:bg-gray-200"
          }`}
        >
          <Undo2 />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={`rounded-md p-1 ${
            !editor.can().chain().focus().redo().run()
              ? "opacity-50"
              : " hover:bg-gray-200"
          }`}
        >
          <Redo2 />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
