import { useSelector } from "react-redux";

import LightSpinner from "../../UI/LightSpinner";
import formatePrice from "../../Utils/formatePrice";
import useCreateOrder from "../../Hooks/firebase/useCreateOrder";

const OrderSummery = () => {
  const { shippingInfo, creditCard } = useSelector(
    (state) => state.userShippingInfo,
  );

  const cartItems = useSelector((state) => state.cartItems.cartItems);

  const cartTotalPrice = cartItems?.reduce((prev, curr) => {
    return (prev += curr.totalPrice);
  }, 0);

  const formattedTotalPrice = formatePrice(cartTotalPrice);

  const { createOrder, orderIsCreating } = useCreateOrder(
    cartItems,
    shippingInfo,
    cartTotalPrice,
  );

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
              createOrder();
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
