import AddressForm from "./AddressForm";
import AddressWrapper from "./AddressWrapper";
import OrderItems from "./OrderItems";
import Payment from "./Payment";

const OrderDetails = () => {
  return (
    <div className="flex-1 pb-20 ">
      <div className="rounded-lg border p-6 shadow-md">
        <AddressWrapper />
        <OrderItems />
      </div>
      <Payment />
    </div>
  );
};
export default OrderDetails;
