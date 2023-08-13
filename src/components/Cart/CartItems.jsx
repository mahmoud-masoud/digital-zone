import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const CartItems = () => {
  const cartItems = useSelector((state) => state.cartItems.items);

  return (
    <div className='flex-1'>
      <h1 className='text-2xl mb-6'>
        <span className='font-bold'>Cart</span> {cartItems.length} Items
      </h1>
      <div className='shadow-card-shadow rounded-md'>
        <div className='p-4 bg-light md:p-8'>
          <h2 className='text-xl font-bold md:text-2xl text-fontColor'>
            Free shipping, arrives tomorrow.
          </h2>
        </div>

        <div className=' p-4 '>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className='last:border-none bb-2 py-4'>
                <CartItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  totalPrice={item.totalPrice}
                  price={item.price}
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
