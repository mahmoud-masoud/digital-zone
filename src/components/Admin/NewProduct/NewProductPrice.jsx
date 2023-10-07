import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';

const NewProductPrice = () => {
  const dispatch = useDispatch();

  const enteredPriceHandler = (e) => {
    let value = +e.target.value;

    dispatch(newProductFormDataActions.addPrice(value));
  };

  return (
    <div className='flex flex-col gap-2 w-32'>
      <label htmlFor='price'>Price</label>
      <input
        type='text'
        id='price'
        placeholder='$0.00'
        className='border border-black rounded-md p-1.5'
        onChange={enteredPriceHandler}
      />
    </div>
  );
};
export default NewProductPrice;
