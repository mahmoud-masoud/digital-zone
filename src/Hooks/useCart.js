import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../Utils/firebase";
import { cartItemsActions } from "../store/cartItems";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  useEffect(() => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      const cartItemsRef = collection(userRef, "cartItems");

      const unsubscribe = onSnapshot(cartItemsRef, (querySnapshot) => {
        const cartItemsData = querySnapshot.docs.map((doc) => doc.data());

        dispatch(cartItemsActions.addCartItems(cartItemsData));
        setItems(cartItemsData);
        setIsLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  }, [user]);

  return {
    error: error,
    items: items,
    isLoading: isLoading,
  };
};
export default useCart;
