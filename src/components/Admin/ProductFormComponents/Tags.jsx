import { useEffect, useState } from "react";

import InputError from "../../../UI/InputError";

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
      <div className="flex justify-between rounded-lg border border-black p-2">
        <input
          type="text"
          name="tags"
          placeholder="Add a tag"
          value={tagInput}
          className="w-full outline-none"
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
          className="rounded-md bg-gray-500 px-6 py-2 font-medium text-white"
          onClick={handleTagAdd}
        >
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
              className="flex w-4 items-center justify-center
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
