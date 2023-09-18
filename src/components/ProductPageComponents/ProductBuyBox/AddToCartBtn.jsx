import { FaPlus, FaMinus } from 'react-icons/fa';
import LoadingSpinner from '../../../UI/LoadingSpinner';

import useCart from '../../../Hooks/useCart';

const AddToCartBtn = ({ title, price, id, image }) => {
  const {
    quantity,
    sendingProduct,
    addToCart,
    removeFromCart,
    userLoading,
    userError,
  } = useCart({ title, price, id, image });

  return (
    <div
      className={`w-36 p-1 bg-primary ${
        quantity === 0 && 'active:bg-after hover:bg-after'
      }
    rounded-full flex justify-center items-center text-white transition`}
    >
      {quantity === 0 && !sendingProduct && (
        <button onClick={addToCart} className='font-medium p-1'>
          <span> {'Add to cart'} </span>
        </button>
      )}

      {sendingProduct && quantity === 0 && <LoadingSpinner />}

      {quantity > 0 && (
        <>
          <button
            className='hover:bg-medium focus:bg-medium p-2 rounded-full'
            onClick={removeFromCart}
          >
            <FaMinus />
          </button>
          <span className='font-medium flex-1 text-center'>
            {quantity + ' added'}
          </span>
          <button
            className='hover:bg-medium focus:bg-medium p-2 rounded-full'
            onClick={addToCart}
            autoFocus
          >
            <FaPlus />
          </button>
        </>
      )}
    </div>
  );
};
export default AddToCartBtn;
