import AddressWrapper from "./AddressWrapper";
import OrderItems from "./OrderItems";
import Payment from "./Payment";

const OrderDetails = () => {
  return (
    <div className="flex-1 sm:pb-20 ">
      <div className="rounded-lg border p-4 shadow-md md:p-6">
        <AddressWrapper />
        <OrderItems />
      </div>
      <Payment />
    </div>
  );
};
export default OrderDetails;
