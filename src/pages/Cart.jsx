import Wrapper from '../UI/Wrapper';
import CartCheckout from '../components/Cart/CartCheckout';
import CartItems from '../components/Cart/CartItems';

const Cart = () => {
  return (
    <Wrapper className={'flex flex-col md:flex-row gap-8'}>
      <CartItems />
      <CartCheckout />
    </Wrapper>
  );
};
export default Cart;
