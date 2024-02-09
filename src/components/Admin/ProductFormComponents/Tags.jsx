import { useEffect, useState } from "react";

import InputError from "../../../UI/InputError";
import { Plus } from "lucide-react";

const Tags = ({ setValue, serverTags, errors }) => {
  const [tags, setTags] = useState(serverTags || []);
  const [tagInput, setTagInput] = useState("");

  const handleTagAdd = () => {
    if (tagInput.trim() !== "") {
      setTags((prev) => [...prev, tagInput]);
      setTagInput("");
    }
  };

  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagRemove = (index) => {
    const filteredTags = tags.filter((tag, idx) => idx !== index);
    setTags(filteredTags);
  };

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          name="tags"
          placeholder="Add a tag"
          value={tagInput}
          className="w-full rounded py-2"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleTagAdd();
            }
          }}
        />
        <button
          type="button"
          className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center rounded
           bg-slate-800 p-2 font-medium text-white duration-150 hover:opacity-80"
          onClick={handleTagAdd}
        >
          <Plus size={22} />
          Add
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 ">
        {tags.map((tag, index) => (
          <div
            key={Math.random() * Date.now()}
            className="flex items-center justify-center gap-2 rounded-lg
             bg-gray-200 px-3 py-1.5 shadow-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="flex items-center justify-center
               rounded-lg p-1 hover:bg-gray-300"
              onClick={() => handleTagRemove(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {errors && errors.tags && <InputError message={errors.tags.message} />}
    </div>
  );
};
export default Tags;
