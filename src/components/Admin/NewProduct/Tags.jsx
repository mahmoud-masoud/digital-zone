import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const dispatch = useDispatch();

  const handleTagAdd = () => {
    if (tagInput.trim() !== '') {
      setTags((prev) => [...prev, tagInput]);
      setTagInput('');
    }
  };

  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  useEffect(() => {
    dispatch(newProductFormDataActions.addTags(tags));
  }, [tags]);

  return (
    <div>
      <div className='flex justify-between border border-black p-2 rounded-lg'>
        <input
          type='text'
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
      <div className='flex gap-4 mt-4'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='flex justify-center items-center bg-gray-200 px-3 py-1.5 shadow-sm rounded-md '
          >
            {tag}
            <button
              className='w-4 ml-2 text-2xl'
              onClick={() => handleTagRemove(tag)}
            >
              <TiDelete />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
export default Tags;
