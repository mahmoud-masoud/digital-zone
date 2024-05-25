import { useMemo } from "react";
import useCart from "../../Hooks/firebase/useCart";
import OrderItem from "./OrderItem";

const OrderItems = () => {
  const { items } = useCart();
  const localItems = useMemo(() => [...items], [items]);
  return (
    <div className="bt-2">
      <p className="mb-10 text-lg font-semibold md:text-2xl">Items details</p>
      <div className="flex flex-wrap gap-4">
        {localItems.map((item) => (
          <OrderItem
            image={item.image}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};
export default OrderItems;
