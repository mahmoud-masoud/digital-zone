import NotLoggedIn from "../components/Checkout/NotLoggedIn";
import { useAuthState } from "react-firebase-hooks/auth";

import useCart from "../Hooks/useCart";
import EmptyCart from "../components/Checkout/EmptyCart";
import Checkout from "../components/Checkout/Checkout";
import MainSpinner from "../UI/MainSpinner";
import { auth } from "../Utils/firebase";

const CheckoutPage = () => {
  const { items, isLoading, error } = useCart();
  const [user, { isLoading: userIsLoading }] = useAuthState(auth);

  const isDataLoading = isLoading || userIsLoading;
  const isUserLoggedIn = user && !user.isAnonymous;
  const isCartEmpty = user && !user.isAnonymous && !items.length;

  if (isDataLoading) return <MainSpinner />;
  if (isUserLoggedIn && isCartEmpty) return <EmptyCart />;
  if (!isUserLoggedIn) return <NotLoggedIn />;

  return <Checkout />;
};
export default CheckoutPage;
