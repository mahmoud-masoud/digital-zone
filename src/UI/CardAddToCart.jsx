import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { cartActions } from '../store/cartItems';

const CardAddToCart = ({ title, price, id, image }) => {
  const dispatch = useDispatch();

  const itemQuantity = useSelector(
    (state) => state.cartItems.items.find((item) => item?.id === id)?.quantity
  );
  const [quantity, setQuantity] = useState(itemQuantity ? itemQuantity : 0);

  const addToCart = () => {
    dispatch(cartActions.addItem({ title, price, id, image }));
    setQuantity(quantity + 1);
  };

  const removeFromCart = () => {
    if (quantity > 0) {
      dispatch(cartActions.removeItem(id));
      setQuantity(quantity - 1);
    }
  };

  const [isClickOutside, setIsClickOutside] = useState(true);
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
      } rounded-full flex justify-between items-center text-white`}
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
          } hover:bg-medium  p-2 rounded-full focus:bg-medium`}
          onClick={addToCart}
          autoFocus
        >
          <FaPlus />
        </button>
      </>

      <button
        onClick={addToCart}
        className={`${
          quantity === 0 ? 'block' : 'hidden'
        } font-medium py-2 px-5`}
      >
        <div className='flex gap-1 items-center'>
          <FaPlus className='text-sm' />
          <span>Add</span>
        </div>
      </button>
    </div>
  );
};

export default CardAddToCart;
