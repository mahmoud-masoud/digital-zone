import EmptyCart from "../components/Cart/EmptyCart";
import PageSpinner from "../UI/PageSpinner";
import useCart from "../Hooks/firebase/useCart";
import Cart from "../components/Cart/Cart";
const CartPage = () => {
  const { items, isLoading, error } = useCart();

  const cartContent = !items.length && !isLoading ? <EmptyCart /> : <Cart />;

  return isLoading ? <PageSpinner /> : cartContent;
};
export default CartPage;
