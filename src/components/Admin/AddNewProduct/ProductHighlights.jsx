import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';
import { useState } from 'react';

const ProductHighlights = () => {
  const dispatch = useDispatch();

  const highlightsHandler = (e) => {
    dispatch(newProductFormDataActions.addHighlights(e.target.value));
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='highlights'>Highlights</label>
      <textarea
        name='highlights'
        id='highlights'
        placeholder='Product highlights'
        className='border border-black rounded-lg p-2 min-h-[100px]'
        onChange={highlightsHandler}
      ></textarea>
    </div>
  );
};
export default ProductHighlights;
