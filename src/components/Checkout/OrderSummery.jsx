import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth, db } from "../../Utils/firebase";
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { useState } from "react";
import LightSpinner from "../../UI/LightSpinner";
import formatePrice from "../../Utils/formatePrice";
import { useAuthState } from "react-firebase-hooks/auth";

const OrderSummery = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [orderIsCreating, setOrderIsCreating] = useState(false);
  const { shippingInfo, creditCard } = useSelector(
    (state) => state.userShippingInfo,
  );
  const cartItems = useSelector((state) => state.cartItems.cartItems);

  const cartTotalPrice = cartItems?.reduce((prev, curr) => {
    return (prev += curr.totalPrice);
  }, 0);

  const formattedTotalPrice = formatePrice(cartTotalPrice);

  const createOrder = async (userId, products) => {
    try {
      setOrderIsCreating(true);

      // create an order
      const ordersColRef = collection(db, "orders");
      const orderRef = await addDoc(ordersColRef, {
        products,
        shippingInfo,
        userId,
        totalAmount: cartTotalPrice,
        timestamp: serverTimestamp(),
      });

      const orderId = orderRef.id;
      await updateDoc(orderRef, {
        id: orderId,
      });

      // update product sold quantity
      products.forEach(async (product) => {
        const q = query(
          collectionGroup(db, "products"),
          where("id", "==", product.id),
        );

        const productDocRef = (await getDocs(q)).docs[0].ref;
        await updateDoc(productDocRef, {
          quantitySold: increment(product.quantity),
        });
      });

      // update user total amount spent
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        amountSpent: increment(cartTotalPrice),
        orders: increment(1),
      });

      // clear the user cart after success order
      const cartItemsColRef = collection(db, `users/${user.uid}/cartItems`);
      const cartItemsSnapshot = await getDocs(cartItemsColRef);
      for (const doc of cartItemsSnapshot.docs) {
        deleteDoc(doc.ref);
      }

      setOrderIsCreating(false);
      navigate("success");
    } catch (error) {
      console.log(error, "error happens");
      setOrderIsCreating(false);
    }
  };

  return (
    <div
      className="h-fit rounded-lg border bg-white shadow-sm sm:sticky
     sm:top-[80px] md:w-[320px]"
    >
      <p className="p-4 text-lg font-bold">Order Summary</p>
      <div className="border-t p-4">
        <div className="flex justify-between ">
          <div className="">SubTotal</div>
          <div>{formattedTotalPrice}</div>
        </div>
        <div className="mb-4 mt-3 flex justify-between ">
          <div className="">Shipping</div>
          <div className="font-semibold text-emerald-600 ">Free</div>
        </div>
        <div className="flex h-10 justify-between border-t py-3">
          <div className="font-semibold">Total</div>
          <div className="font-semibold">{formattedTotalPrice}</div>
        </div>
      </div>
      {shippingInfo && creditCard && cartItems.length > 0 && (
        <div className="p-4">
          <button
            onClick={() => {
              createOrder(user.uid, cartItems);
            }}
            className="flex w-full  items-center justify-center rounded-full
             bg-primary px-6 py-2 font-semibold
         text-white duration-200 hover:bg-after"
          >
            {orderIsCreating ? (
              <LightSpinner className={"h-7 w-7"} />
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
export default OrderSummery;
