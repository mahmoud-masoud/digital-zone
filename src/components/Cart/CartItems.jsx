import CartItem from "./CartItem";

const CartItems = ({ cartItems }) => {
  return (
    <div className="flex-1">
      <h1 className="mb-6 text-lg md:text-2xl">
        <span className="font-bold">Cart</span> {cartItems?.length} Items
      </h1>
      <div className="rounded-md shadow-card-shadow">
        <div className="bg-light p-4 md:p-8">
          <h2 className="font-semibold text-fontColor md:text-2xl">
            Free shipping, arrives tomorrow.
          </h2>
        </div>

        <div className=" p-4 ">
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id} className="bb-2 py-4 last:border-none">
                <CartItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  totalPrice={item.totalPrice}
                  price={item.price}
                  quantity={item.quantity}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CartItems;
