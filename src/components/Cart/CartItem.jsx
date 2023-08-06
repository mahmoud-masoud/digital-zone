import { FaArrowRotateLeft, FaMinus, FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartItems';
import { Link } from 'react-router-dom';
const CartItem = ({ title, price, totalPrice, image, id }) => {
  const itemQuantity = useSelector(
    (state) => state.cartItems.items.find((item) => item.id == id).quantity
  );

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(cartActions.addItem({ price, id }));
  };

  const removeFromTheCart = () => {
    dispatch(cartActions.removeItem(id));
  };

  const removeItemPermanently = () => {
    dispatch(cartActions.removeItemPermanently(id));
  };
  return (
    <div className='bb-2 py-4'>
      <Link to={`/${id}`}>
        <div className='flex mb-6 gap-4'>
          <div className='img-box w-24'>
            <img src={image} alt={title} className='max-w-full' />
          </div>

          <div className='item-name'>
            <h3>{title}</h3>
            <span>Color: purple</span>
            <div className='flex gap-2 items-center'>
              <FaArrowRotateLeft className='bg-primary w-5 h-5 p-1 rounded-full text-white' />
              Free 30-day returns
            </div>
          </div>

          <div className='item-price ml-auto'>
            <span className='font-bold text-lg'>{`$${totalPrice}`}</span>
          </div>
        </div>
      </Link>

      <div className='cart-item-actions flex justify-between md:justify-end gap-4  md:gap-10'>
        <button onClick={removeItemPermanently} className='underline text-sm'>
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
           hover:text-white flex items-center justify-center'
          >
            <FaPlus />
          </button>
          <span className='inline-block font-bold'>{itemQuantity}</span>
          <button
            onClick={removeFromTheCart}
            className='rounded-full w-6 h-6 p-0.5 hover:bg-gray-500
           hover:text-white flex items-center justify-center'
          >
            <FaMinus />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
