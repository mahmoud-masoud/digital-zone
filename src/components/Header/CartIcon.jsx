import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { auth, db } from "../../Utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const CartIcon = ({ isInputOnFocus }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [cartQuantity, setCartQuantity] = useState(0);
  useEffect(() => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      const cartItemsRef = collection(userRef, "cartItems");

      const unsubscribe = onSnapshot(cartItemsRef, (querySnapshot) => {
        const cartItemsData = querySnapshot.docs.length;
        setCartQuantity(cartItemsData);
      });

      return unsubscribe;
    } catch (error) {
      console.log("error", error);
    }
  }, [user]);

  return (
    <Link
      to={"cart"}
      className={`rounded-full px-4 py-1.5 hover:bg-after focus:bg-after ${
        isInputOnFocus && "opacity-0 md:opacity-100"
      }`}
    >
      <div className="relative">
        <HiMiniShoppingCart className="text-3xl text-white" />
        <span
          className="absolute  -right-2 -top-2 flex h-5 w-5 items-center justify-center
         rounded-full bg-secondary p-0.5 text-dark"
        >
          {cartQuantity}
        </span>
      </div>
    </Link>
  );
};
export default CartIcon;
