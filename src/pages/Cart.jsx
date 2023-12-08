import Wrapper from "../UI/Wrapper";
import CartCheckout from "../components/Cart/CartCheckout";
import CartItems from "../components/Cart/CartItems";
import CartEmpty from "../components/Cart/CartEmpty";
import Loading from "../UI/Loading";
import useCart from "../Hooks/useCart";
const Cart = () => {
  const { items, isLoading, error } = useCart();

  const cartContent =
    !items.length && !isLoading ? (
      <CartEmpty />
    ) : (
      <>
        <CartItems cartItems={items} />
        <CartCheckout cartItems={items} />
      </>
    );

  return (
    <Wrapper className="flex flex-col gap-8 p-4 md:flex-row">
      {isLoading ? <Loading /> : cartContent}
    </Wrapper>
  );
};
export default Cart;
