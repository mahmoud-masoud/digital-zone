import { Link } from "react-router-dom";
import { auth, db } from "../../Utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

const CartIcon = ({ isInputOnFocus }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);

      const cartItemsRef = collection(userRef, "cartItems");

      const unsubscribe = onSnapshot(cartItemsRef, (querySnapshot) => {
        const cartItemsQuantity = querySnapshot.docs.reduce((prev, curr) => {
          return (prev += curr.data().quantity);
        }, 0);
        setCartQuantity(cartItemsQuantity);
      });

      return unsubscribe;
    } catch (error) {
      console.log("error", error);
    }
  }, [user]);

  return (
    <button
      type="button"
      className={`rounded-full px-4 py-1.5 hover:bg-after focus:bg-after ${
        isInputOnFocus && "opacity-0 md:opacity-100"
      }`}
    >
      <Link to={"cart"}>
        <div className="relative z-0">
          <ShoppingCart className="text-white" size={30} />
          <span
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center
         rounded-full  border border-red-500 bg-secondary p-0.5 text-sm text-black"
          >
            {cartQuantity}
          </span>
        </div>
      </Link>
    </button>
  );
};
export default CartIcon;
