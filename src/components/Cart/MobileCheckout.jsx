import { useNavigate } from "react-router-dom";
import CartNote from "./CartNote";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import LoginPopup from "../../UI/LoginPopup";
import { AnimatePresence } from "framer-motion";
import { auth } from "../../Utils/firebase";
const MobileCheckout = ({ cartTotalPrice }) => {
  const [isLoginPopup, setLoginPopup] = useState(false);
  const [user, isLoading, isError] = useAuthState(auth);
  const navigate = useNavigate();
  const onCheckoutBtnClickHandler = () => {
    if ((user && user.isAnonymous) || !user) {
      setLoginPopup(true);
      return;
    }
    navigate("/checkout");
  };

  return (
    <div
      className="fixed bottom-0 right-0 z-[1000] w-full bg-white shadow-card-shadow
     md:hidden"
    >
      <CartNote />
      <div className="bb-2 flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <span className="font-bold">Estimated total</span>
          <span className="font-bold text-green-700">{`$${cartTotalPrice}`}</span>
        </div>
        <button
          onClick={onCheckoutBtnClickHandler}
          className="w-full rounded-full bg-primary px-4 py-2 font-bold text-white"
        >
          Continue to checkout
        </button>
      </div>
      <AnimatePresence>
        {(user?.isAnonymous || !user) && isLoginPopup && (
          <LoginPopup closePopup={() => setLoginPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
export default MobileCheckout;
