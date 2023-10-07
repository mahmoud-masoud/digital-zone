import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';
import { useEffect, useState } from 'react';

const ProductHighlights = () => {
  const dispatch = useDispatch();

  const [highlightInput, setHighlight] = useState({ key: '', value: '' });
  const [highlights, setHighlights] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setHighlight({ ...highlightInput, [id]: value });
  };

  const handleAddHighlight = () => {
    if (
      highlightInput.key.trim() !== '' &&
      highlightInput.value.trim() !== ''
    ) {
      setHighlights([...highlights, highlightInput]);

      setHighlight({ key: '', value: '' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(highlightInput);
      handleAddHighlight();
    }
  };

  useEffect(() => {
    dispatch(newProductFormDataActions.addHighlights(highlights));
  }, [highlights]);

  return (
    <div className='flex flex-col gap-6 mb-6'>
      <h2 htmlFor='highlights'>Highlights</h2>

      <div className='flex gap-2 items-end'>
        <div className='flex gap-4 flex-1'>
          <div className='flex gap-2 flex-1 flex-col'>
            <label htmlFor='key' className='text-lg'>
              Key
            </label>
            <input
              type='text'
              id='key'
              placeholder='Screen size'
              className='border border-black w-full p-2 rounded-md'
              value={highlightInput.key}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='flex gap-2 flex-1 flex-col'>
            <label htmlFor='value' className='text-lg'>
              Value
            </label>
            <input
              type='text'
              id='value'
              placeholder='6.7 inch'
              className='border border-black w-full p-2 rounded-md'
              value={highlightInput.value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <button
          type='button'
          className='bg-gray-500 font-medium text-white px-6 py-2 rounded-md w-fit h-fit'
          onClick={handleAddHighlight}
        >
          Add feature
        </button>
      </div>

      {/* Display the added highlights */}
      <div>
        <h3>Added Features:</h3>
        <ul className='text-lg'>
          {highlights.map((feature, index) => (
            <li key={index}>
              {feature.key}: {feature.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductHighlights;
