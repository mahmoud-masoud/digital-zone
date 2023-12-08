import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth, db } from "../../Utils/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";

const OrderSummery = () => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [orderIsCreating, setOrderIsCreating] = useState(false);
  const { shippingInfo, creditCard } = useSelector(
    (state) => state.userShippingInfo,
  );
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const totalAmount = useSelector((state) => state.cartItems.totalAmount);

  console.log(totalAmount);

  const navigate = useNavigate();

  const createOrder = async (userId, products) => {
    try {
      setOrderIsCreating(true);
      const orderRef = await addDoc(collection(db, "orders"), {
        products,
        shippingInfo,
        userId,
        timestamp: serverTimestamp(),
      });

      const orderId = orderRef.id;

      await updateDoc(orderRef, {
        id: orderId,
      });
      setOrderIsCreating(false);
      navigate("success");
    } catch (error) {
      console.log(error, "error happens");
      setOrderIsCreating(false);
    }
  };

  return (
    <div className="top-[80px] h-fit w-[340px]  rounded-lg border shadow-sm  md:sticky">
      <p className="p-4 text-lg font-bold">Order Summary</p>
      <div className="border-t p-4">
        <div className="flex justify-between ">
          <div className="">SubTotal</div>
          <div>$1110</div>
        </div>
        <div className="mb-4 mt-3 flex justify-between ">
          <div className="">Shipping</div>
          <div className="font-semibold text-emerald-600 ">Free</div>
        </div>
        <div className="flex h-10 justify-between border-t py-3">
          <div className="font-semibold">Total</div>
          <div className="font-semibold">$1110</div>
        </div>
      </div>
      {shippingInfo && creditCard && (
        <div className="px-4 pb-4">
          <button
            onClick={() => {
              createOrder(user.uid, cartItems);
            }}
            className="w-full rounded-full  bg-primary px-6 py-2.5 font-semibold
         text-white duration-200 hover:bg-after"
          >
            {orderIsCreating ? <LoadingSpinner /> : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};
export default OrderSummery;
