import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';

const NewProductCollectionSelect = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('laptops');

  const selectedCategoryHandler = (e) => {
    setValue(() => e.target.value);
  };

  const categoryRef = useRef();

  useEffect(() => {
    dispatch(newProductFormDataActions.addCategory(categoryRef.current.value));
  }, [value]);

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='collection' className='mr-2'>
        Collection
      </label>
      <select
        name='collection'
        id='collection'
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
  );
};
export default NewProductCollectionSelect;
