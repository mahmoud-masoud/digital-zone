import CartNote from "./CartNote";
import isMobileOrTablet from "../../Utils/isMobileOrTablet";
import MobileCheckout from "./MobileCheckout";
import { Link, useNavigate } from "react-router-dom";
import formatePrice from "../../Utils/formatePrice";
import { auth } from "../../Utils/firebase";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Turtle } from "lucide-react";
import LoginPopup from "../../UI/LoginPopup";
const CartCheckout = ({ cartItems }) => {
  const [isPopup, setPopup] = useState(false);

  const navigate = useNavigate();
  const onCheckoutBtnClickHandler = () => {
    if (auth.currentUser?.isAnonymous || !auth.currentUser) {
      setPopup(true);
      return;
    }
    navigate("/checkout");
  };

  const cartQuantity = cartItems?.length;
  const cartTotalPrice = cartItems?.reduce((prev, curr) => {
    console.log(curr.totalPrice);
    return (prev += curr.totalPrice);
  }, 0);

  const formattedTotalPrice = formatePrice(cartTotalPrice);

  return (
    <div
      className="sticky top-24 mb-[200px] w-full self-start rounded-md
     py-4 shadow-card-shadow md:mb-0 md:w-1/3 "
    >
      {isMobileOrTablet ? (
        <MobileCheckout cartTotalPrice={cartTotalPrice} />
      ) : (
        <div className="bb-2 flex flex-col gap-4 p-4">
          <button
            onClick={onCheckoutBtnClickHandler}
            className="w-full rounded-full bg-primary px-4 py-2 font-bold text-white hover:bg-after"
          >
            Continue to checkout
          </button>

          <CartNote />
        </div>
      )}

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
        {(auth.currentUser?.isAnonymous || !auth.currentUser) && isPopup && (
          <LoginPopup closePopup={() => setPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
export default CartCheckout;
