import Wrapper from '../UI/Wrapper';
import CartCheckout from '../components/Cart/CartCheckout';
import CartItems from '../components/Cart/CartItems';
import CartEmpty from '../components/Cart/CartEmpty';
import { useSelector } from 'react-redux';
const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.items);

  const cartContent = cartItems.length ? (
    <>
      <CartItems />
      <CartCheckout />
    </>
  ) : (
    <CartEmpty />
  );

  return (
    <Wrapper className='flex flex-col md:flex-row gap-8 p-4'>
      {cartContent}
    </Wrapper>
  );
};
export default Cart;
