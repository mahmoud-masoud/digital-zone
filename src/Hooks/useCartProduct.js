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
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Utils/firebase";
import { removeProductFromTheCart } from "../Utils/firebase-functions";

const useCartProduct = ({ title, price, id, image }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);

  const [quantity, setQuantity] = useState(0);
  const [sendingProduct, setSendingProduct] = useState(false);
  const [productError, setProductError] = useState(false);

  const productId = id;
  const userUid = user?.uid;

  const addToCart = async () => {
    if (quantity >= 1) setQuantity((prev) => (prev += 1));
    setSendingProduct(true);
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
          setSendingProduct(false);
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
          setSendingProduct(false);
        }
      }).catch((error) => {
        setProductError(true);
        setSendingProduct(false);
        console.log("Firestore transaction error:", error);
      });
    } catch (error) {
      setProductError(true);
      setSendingProduct(false);
      console.log("Error outside Firestore transaction:", error);
    }
  };

  const removeFromCart = () => {
    setQuantity((prev) => (prev -= 1));
    removeProductFromTheCart(userUid, productId, price);
  };

  const removeProductPermanently = () => {
    const removeProductPermanentlyFromTheCart = async (userUID, productId) => {
      try {
        const userRef = doc(db, "users", userUid);

        const cartItemsRef = collection(userRef, "cartItems");

        const productRef = doc(cartItemsRef, productId);
        await runTransaction(db, async (transaction) => {
          transaction.delete(productRef);
        });
      } catch (error) {
        console.log(error);
      }
    };
    removeProductPermanentlyFromTheCart(userUid, productId);
  };

  useEffect(() => {
    if (!user) return;

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
  }, []);

  return {
    quantity,
    sendingProduct,
    productError,
    addToCart,
    removeFromCart,
    removeProductPermanently,
    userLoading,
    userError,
  };
};

export default useCartProduct;
