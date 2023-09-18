import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';

const NewProductCollectionSelect = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('laptops');
  const [subcategory, setSubcategory] = useState('');

  const selectedCategoryHandler = (e) => {
    setValue(() => e.target.value);
  };

  const categoryRef = useRef();

  useEffect(() => {
    dispatch(newProductFormDataActions.addCategory(categoryRef.current.value));
  }, [value]);

  return (
    <>
      <div className=''>
        <label htmlFor='collections' className='mr-2'>
          Categories
        </label>
        <select
          name='collections'
          id='collections'
          defaultValue={'laptops'}
          ref={categoryRef}
          className='border border-black p-1'
          onChange={selectedCategoryHandler}
        >
          <option value='laptops'>Laptops</option>
          <option value='headphones'>Headphones</option>
          <option value='smart-watches'>Smart Watches</option>
          <option value='mobile-phones'>Mobile Phones</option>
          <option value='gaming'>Gaming</option>
        </select>
      </div>

      {value === 'gaming' && (
        <div>
          <label>Select Subcategory:</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option value='controllers'>Controllers</option>
            <option value='consoles'>Consoles</option>
          </select>
        </div>
      )}
    </>
  );
};
export default NewProductCollectionSelect;
