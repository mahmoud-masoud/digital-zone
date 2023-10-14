import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaX } from 'react-icons/fa6';

const Tags = ({ setValue, serverTags }) => {
  const [tags, setTags] = useState(serverTags ? serverTags : []);
  const [tagInput, setTagInput] = useState('');

  const handleTagAdd = () => {
    if (tagInput.trim() !== '') {
      setTags((prev) => [...prev, tagInput]);
      setTagInput('');
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
    setValue('tags', tags);
  }, [tags]);

  return (
    <div>
      <div className='flex justify-between border border-black p-2 rounded-lg'>
        <input
          type='text'
          name='tags'
          placeholder='Add a tag'
          value={tagInput}
          className='outline-none w-full'
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleTagAdd();
            }
          }}
        />
        <button
          type='button'
          className='bg-gray-500 font-medium text-white px-6 py-2 rounded-md'
          onClick={handleTagAdd}
        >
          Add
        </button>
      </div>
      <div className='flex flex-wrap items-center gap-4 mt-4 '>
        {tags.map((tag, index) => (
          <div
            key={Math.random() * Date.now()}
            className='flex gap-2 justify-center items-center bg-gray-200
             px-3 py-1.5 shadow-sm rounded-lg'
          >
            <span>{tag}</span>
            <button
              type='button'
              className='flex justify-center items-center p-1
               rounded-lg hover:bg-gray-300 w-4 text-[12px]'
              onClick={() => handleTagRemove(index)}
            >
              <FaX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tags;
