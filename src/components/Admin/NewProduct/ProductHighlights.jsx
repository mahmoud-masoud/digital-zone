import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';

const ProductHighlights = ({ setValue, serverHighlights }) => {
  const [highlightInput, setHighlight] = useState({ key: '', value: '' });
  const [highlights, setHighlights] = useState(
    serverHighlights ? serverHighlights : []
  );

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

  const handleRemoveHighlight = (highlightToRemove) => {
    console.log(highlightToRemove);
    const updatedHighlights = highlights.filter(
      (highlight) => highlight !== highlightToRemove
    );
    setHighlights(updatedHighlights);
  };

  useEffect(() => {
    setValue('highlights', highlights);
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

      <div>
        <div className='bg-gray-100 rounded-lg'>
          <ul className='flex flex-col md:flex-row flex-wrap p-5'>
            {highlights.map((highlight, index) => (
              <li
                key={index + 10 * Date.now()}
                className='flex gap-2 group md:w-1/2 text-sm py-1 text-gray-800 md:even:pl-5 md:odd:border-r border-gray-300'
              >
                <div className='flex font-medium w-2/3 '>{highlight.key}</div>
                <div className='flex pr-2'>{highlight.value}</div>
                <button
                  type='button'
                  onClick={() => handleRemoveHighlight(highlight)}
                  className='hidden group-hover:block'
                >
                  {' '}
                  <TiDelete />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductHighlights;
