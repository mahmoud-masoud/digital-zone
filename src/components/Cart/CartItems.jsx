import CartItem from './CartItem';

const CartItems = ({ cartItems }) => {
  return (
    <div className='flex-1'>
      <h1 className='text-2xl mb-6'>
        <span className='font-bold'>Cart</span> {cartItems?.length} Items
      </h1>
      <div className='shadow-card-shadow rounded-md'>
        <div className='p-4 bg-light md:p-8'>
          <h2 className='text-xl font-bold md:text-2xl text-fontColor'>
            Free shipping, arrives tomorrow.
          </h2>
        </div>

        <div className=' p-4 '>
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id} className='last:border-none bb-2 py-4'>
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
