import EmptyCart from "../components/Cart/EmptyCart";
import MainSpinner from "../UI/MainSpinner";
import useCart from "../Hooks/useCart";
import Cart from "../components/Cart/Cart";
const CartPage = () => {
  const { items, isLoading, error } = useCart();

  const cartContent = !items.length && !isLoading ? <EmptyCart /> : <Cart />;

  return isLoading ? <MainSpinner /> : cartContent;
};
export default CartPage;
