import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';

const NewProductDescription = () => {
  const dispatch = useDispatch();
  const enteredDescriptionHandler = (e) => {
    dispatch(newProductFormDataActions.addDescription(e.target.value));
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='description'>Description</label>
      <textarea
        name='description'
        id='description'
        placeholder='Product Description'
        className='border border-black rounded-lg p-2 min-h-[200px]'
        onChange={enteredDescriptionHandler}
      ></textarea>
    </div>
  );
};
export default NewProductDescription;
