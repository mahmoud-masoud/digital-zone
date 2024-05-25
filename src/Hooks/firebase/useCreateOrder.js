import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const useCreateOrder = (products, shippingInfo, cartTotalPrice) => {
  const [orderIsCreating, setOrderIsCreating] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userId = user.uid;

  const createOrder = async () => {
    try {
      setOrderIsCreating(true);

      await createOrderInDatabase(
        userId,
        products,
        shippingInfo,
        cartTotalPrice,
      );
      await updateProductSoldQuantity(products);
      await updateUserTotalAmountSpent(userId, cartTotalPrice);
      await clearUserCart(userId);

      setOrderIsCreating(false);
      navigate("success");
    } catch (error) {
      console.error("An error occurred while creating the order:", error);
      setOrderIsCreating(false);
    }
  };

  return { createOrder, orderIsCreating };
};
export default useCreateOrder;

const createOrderInDatabase = async (
  userId,
  products,
  shippingInfo,
  cartTotalPrice,
) => {
  const ordersColRef = collection(db, "orders");
  const orderRef = await addDoc(ordersColRef, {
    products,
    shippingInfo,
    userId,
    totalAmount: cartTotalPrice,
    timestamp: serverTimestamp(),
  });

  const orderId = orderRef.id;
  await updateDoc(orderRef, { id: orderId });
  return orderId;
};

const updateProductSoldQuantity = async (products) => {
  const batch = writeBatch(db);

  for (const product of products) {
    const q = query(
      collectionGroup(db, "products"),
      where("id", "==", product.id),
    );
    const productDocSnap = await getDocs(q);
    const productDocRef = productDocSnap.docs[0].ref;
    batch.update(productDocRef, { quantitySold: increment(product.quantity) });
  }

  await batch.commit();
};

const updateUserTotalAmountSpent = async (userId, amount) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    amountSpent: increment(amount),
    orders: increment(1),
  });
};

const clearUserCart = async (userId) => {
  const cartItemsColRef = collection(db, `users/${userId}/cartItems`);
  const cartItemsSnapshot = await getDocs(cartItemsColRef);

  const batch = writeBatch(db);
  cartItemsSnapshot.forEach((productDoc) => {
    batch.delete(productDoc.ref);
  });

  await batch.commit();
};
