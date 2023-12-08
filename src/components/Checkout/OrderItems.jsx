import useCart from "../../Hooks/useCart";
import OrderItem from "./OrderItem";

const OrderItems = () => {
  const { items, isLoading, error } = useCart();
  return (
    <div className="bt-2">
      <p className="mb-10 text-2xl font-semibold">Items details</p>
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
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
