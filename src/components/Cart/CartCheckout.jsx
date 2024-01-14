import CartNote from "./CartNote";
import MobileCheckout from "./MobileCheckout";
import { useNavigate } from "react-router-dom";
import formatePrice from "../../Utils/formatePrice";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import LoginPopup from "../../UI/LoginPopup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Utils/firebase";
const CartCheckout = ({ cartItems }) => {
  const [isLoginPopup, setLoginPopup] = useState(false);
  const [user, isLoading, isError] = useAuthState(auth);

  const navigate = useNavigate();
  const onCheckoutBtnClickHandler = () => {
    if (user?.isAnonymous || !user) {
      setLoginPopup(true);
      return;
    }
    navigate("/checkout");
  };

  const cartQuantity = cartItems?.length;
  const cartTotalPrice = cartItems?.reduce((prev, curr) => {
    return (prev += curr.totalPrice);
  }, 0);
  const formattedTotalPrice = formatePrice(cartTotalPrice);

  return (
    <div
      className="sticky top-24 mb-[200px] w-full self-start rounded-md
     py-4 shadow-card-shadow sm:mb-0 md:w-1/3 "
    >
      <MobileCheckout cartTotalPrice={formattedTotalPrice} />
      <div className="bb-2 hidden flex-col gap-4 p-4 md:flex">
        <button
          onClick={onCheckoutBtnClickHandler}
          className="w-full rounded-full bg-primary px-4 py-2 font-bold
           text-white hover:bg-after"
        >
          Continue to checkout
        </button>

        <CartNote />
      </div>

      <div className="px-4">
        <div className="bb-2 flex items-center justify-between py-4">
          <span className="font-semibold">Total items {cartQuantity}</span>
          <span className="text-lg">{formattedTotalPrice}</span>
        </div>

        <div className="bb-2 flex items-center justify-between py-4">
          <span>Shipping</span>
          <span className="text-green-700">Free</span>
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="font-bold">Estimated total</span>
          <span className="font-bold text-green-700">
            {formattedTotalPrice}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {(user?.isAnonymous || !user) && isLoginPopup && (
          <LoginPopup closePopup={() => setLoginPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
export default CartCheckout;
