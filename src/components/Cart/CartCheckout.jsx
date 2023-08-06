import CartNote from './CartNote';
import isMobileOrTablet from '../../Utils/isMobileOrTablet';
import MobileCheckout from './MobileCheckout';
import { useSelector } from 'react-redux';

const CartCheckout = () => {
  const cartQuantity = useSelector((state) => state.cartItems.quantity);
  const totalPrice = useSelector((state) => state.cartItems.cartTotalPrice);

  return (
    <div className='shadow-card-shadow w-full rounded-md mb-[200px] md:mb-0 md:w-1/3 self-start sticky top-6 py-4 '>
      {isMobileOrTablet ? (
        <MobileCheckout />
      ) : (
        <div className='bb-2 p-4 flex flex-col gap-4'>
          <button className='w-full bg-primary font-bold text-white px-4 py-2 rounded-full'>
            Continue to checkout
          </button>
          <CartNote />
        </div>
      )}

      <div className='px-4'>
        <div className='flex items-center justify-between bb-2 py-4'>
          <span className='font-semibold'>Total items {cartQuantity}</span>
          <span className='text-lg'>{`$${totalPrice}`}</span>
        </div>

        <div className='flex items-center justify-between bb-2 py-4'>
          <span>Shipping</span>
          <span className='text-green-700'>Free</span>
        </div>

        <div className='flex items-center justify-between py-4'>
          <span className='font-bold'>Estimated total</span>
          <span className='text-green-700 font-bold'>{`$${totalPrice}`}</span>
        </div>
      </div>
    </div>
  );
};
export default CartCheckout;
