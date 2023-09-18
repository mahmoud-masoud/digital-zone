import AddToCartBtn from '../ProductPageComponents/ProductBuyBox/AddToCartBtn';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { auth } from '../../Utils/firebase';
import {
  removeProductFromFavorites,
  updateNeededQuantity,
} from '../../Utils/firebase-functions';
import { useAuthState } from 'react-firebase-hooks/auth';

const options = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
];

const FavItem = ({ title, image, price, id, fetchedNeededQuantity }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);

  const selectedValueHandler = (e) => {
    const selectedNeededQuantity = +e.target.value;

    updateNeededQuantity(user.uid, id, selectedNeededQuantity);
  };

  const removeItem = () => {
    removeProductFromFavorites(user.uid, id);
  };

  return (
    <>
      <Link to={`/ip/${id}`}>
        <div className='flex justify-between'>
          <div className='flex justify-between gap-4 md:gap-6 lg:gap-10'>
            <div className='max-w-[100px] lg:max-w-[150px]'>
              <img
                src={image}
                alt={title}
                width='150'
                height='150'
                className='max-w-full'
              />
            </div>
            <p className=''>{title}</p>
          </div>

          <span className='font-bold text-lg'>{`$${price}`}</span>
        </div>
      </Link>

      <div className='flex justify-between'>
        <div className='flex gap-6 items-center justify-center'>
          <button
            className='underline hover:text-primary hover:no-underline'
            onClick={removeItem}
          >
            Remove
          </button>
          <div>
            <label htmlFor='select'>Need:</label>
            <select
              name='select'
              id='select'
              className='text-fontColor'
              onChange={selectedValueHandler}
              defaultValue={fetchedNeededQuantity ? fetchedNeededQuantity : 1}
            >
              {options.map((option) => {
                return (
                  <option value={option.value} key={option.value}>
                    {option.value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <AddToCartBtn title={title} id={id} image={image} price={price} />
      </div>
    </>
  );
};
export default FavItem;
