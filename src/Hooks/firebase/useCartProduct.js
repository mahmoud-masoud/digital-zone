import { useEffect, useState } from "react";
import {
  runTransaction,
  serverTimestamp,
  doc,
  collection,
  query,
  onSnapshot,
  where,
  increment,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../Utils/firebaseConfig";
import useAuthState from "./useAuthState";
import { removeProductFromTheCart } from "../../Utils/firebase-functions";

const useCartProduct = ({ title, price, id, image }) => {
  const { user, isLoading: userLoading, isError: userError } = useAuthState();

  const [quantity, setQuantity] = useState(0);
  const [isProductAdding, setProductIsAdding] = useState(false);
  const [productError, setProductError] = useState(false);

  const productId = id;
  const userUid = user?.uid;

  const addToCart = async () => {
    if (!user) return;
    if (quantity >= 1) setQuantity((prev) => (prev += 1));
    setProductIsAdding(true);
    try {
      const userRef = doc(db, "users", userUid);
      const cartItemsRef = collection(userRef, "cartItems");
      const productRef = doc(cartItemsRef, productId);

      await runTransaction(db, async (transaction) => {
        const productDoc = await transaction.get(productRef);

        if (productDoc.exists()) {
          transaction.update(productRef, {
            quantity: increment(1),
            totalPrice: increment(price),
          });
          setProductIsAdding(false);
        } else {
          const productWithTimestamp = {
            title,
            price,
            totalPrice: price,
            id,
            quantity: 1,
            image,
            timestamp: serverTimestamp(),
          };

          transaction.set(productRef, productWithTimestamp);
          setProductIsAdding(false);
        }
      });
    } catch (error) {
      setProductError(true);
      setProductIsAdding(false);
      console.log("Error outside Firestore transaction:", error);
    }
  };

  const removeFromCart = () => {
    if (!user) return;
    setQuantity((prev) => (prev -= 1));
    removeProductFromTheCart(userUid, productId, price);
  };

  const removeProductPermanently = () => {
    if (!user) return;
    const removeProductPermanentlyFromTheCart = async () => {
      try {
        const userRef = doc(db, "users", userUid);

        const cartItemsRef = collection(userRef, "cartItems");

        const productRef = doc(cartItemsRef, productId);
        await deleteDoc(productRef);
      } catch (error) {
        console.log(error);
      }
    };
    removeProductPermanentlyFromTheCart(userUid, productId);
  };

  useEffect(() => {
    if (user)
      try {
        const userRef = doc(db, "users", userUid);
        const cartItemsRef = collection(userRef, "cartItems");
        const q = query(cartItemsRef, where("id", "==", productId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const item = querySnapshot.docs[0].data();
            const itemQuantity = item.quantity;
            setQuantity(itemQuantity);
          }
        });

        return unsubscribe;
      } catch (error) {
        console.log("error from catch", error);
      }
  }, [userLoading, productId, user, userUid]);

  return {
    quantity,
    isProductAdding,
    productError,
    addToCart,
    removeFromCart,
    removeProductPermanently,
    userLoading,
    userError,
  };
};

export default useCartProduct;
