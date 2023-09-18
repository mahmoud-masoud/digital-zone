import { FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import useCart from '../Hooks/useCart';
import LoadingSpinner from './LoadingSpinner';

const CardAddToCart = ({ title, price, id, image }) => {
  const [isClickOutside, setIsClickOutside] = useState(true);
  const {
    quantity,
    sendingProduct,
    addToCart,
    removeFromCart,
    userLoading,
    userError,
  } = useCart({ title, price, id, image });
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (buttonRef.current && buttonRef.current.contains(e.target)) {
        setIsClickOutside(false);
      } else {
        setIsClickOutside(true);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div
      className={`bg-primary scale-[.8] md:scale-100 overflow-hidden main-btn ${
        quantity > 0 ? 'p-1 gap-6' : 'w-fit active:bg-after hover:bg-after'
      } rounded-full flex justify-between items-center text-white `}
      onClick={(e) => e.preventDefault()}
      ref={buttonRef}
    >
      <>
        <button
          className={`${
            (isClickOutside || quantity === 0) && 'hidden'
          } hover:bg-medium  p-2 rounded-full focus:bg-medium `}
          onClick={removeFromCart}
        >
          <FaMinus />
        </button>
        <span
          className={`${
            quantity === 0 ? 'hidden' : 'w-8 h-8'
          } font-medium flex-1 text-center flex items-center justify-center`}
        >
          {quantity}
        </span>
        <button
          className={`${
            (isClickOutside || quantity === 0) && 'hidden'
          } hover:bg-medium  p-2 rounded-full focus:bg-medium `}
          onClick={addToCart}
          autoFocus
        >
          <FaPlus />
        </button>
      </>

      <button
        onClick={addToCart}
        className={`${
          quantity === 0 && !sendingProduct ? 'block' : 'hidden'
        } font-medium py-2 px-5 `}
      >
        <div className='flex gap-1 items-center'>
          <FaPlus className='text-sm' />
          <span>Add</span>
        </div>
      </button>

      {sendingProduct && quantity === 0 && (
        <div className='w-24 py-1 flex justify-center items-center '>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default CardAddToCart;
