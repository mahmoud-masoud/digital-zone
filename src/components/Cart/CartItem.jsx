import { FaArrowRotateLeft, FaMinus, FaPlus } from 'react-icons/fa6';

import { Link } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

const CartItem = ({ title, price, totalPrice, image, id }) => {
  const {
    quantity,
    sendingProduct,
    addToCart,
    removeFromCart,
    removeProductPermanently,
    userLoading,
    userError,
  } = useCart({ title, price, id, image });

  return (
    <>
      <Link to={`/ip/${id}`}>
        <div className='flex mb-6 gap-4'>
          <div className='img-box w-24 shrink-0 flex justify-center items-center'>
            <img src={image} alt={title} className='max-w-full max-h-full' />
          </div>

          <div className='item-name'>
            <h3 className='text-sm'>{title}</h3>
            <span>Color: purple</span>
            <div className='flex gap-2 items-center'>
              <FaArrowRotateLeft className='bg-primary w-5 h-5 p-1 rounded-full text-white' />
              Free 30-day returns
            </div>
          </div>

          <div className='item-price ml-auto'>
            <span className='font-bold text-lg'>{totalPrice}</span>
          </div>
        </div>
      </Link>

      <div className='cart-item-actions flex justify-between md:justify-end gap-4  md:gap-10'>
        <button
          onClick={removeProductPermanently}
          className='underline text-sm'
        >
          Remove
        </button>
        <button className='underline'>Save for later</button>

        <div
          className='add-remove text-sm border-[1px] border-gray-400
        rounded-full flex justify-between items-center p-1 w-28'
        >
          <button
            onClick={addToCart}
            className='rounded-full w-6 h-6 p-0.5 hover:bg-gray-500
           hover:text-white flex items-center justify-center focus:bg-gray-500 focus:text-white'
          >
            <FaPlus />
          </button>
          <span className='inline-block font-bold'>{quantity}</span>
          <button
            onClick={removeFromCart}
            className='rounded-full w-6 h-6 p-0.5 hover:bg-gray-500
           hover:text-white flex items-center justify-center focus:bg-gray-500 focus:text-white'
          >
            <FaMinus />
          </button>
        </div>
      </div>
    </>
  );
};
export default CartItem;
