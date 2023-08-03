import { useSelector } from 'react-redux';
import CartItem from './CartItem';

// const cartProducts = localStorage.getItem('cartProducts')
//   ? JSON.parse(localStorage.getItem('cartProducts'))
//   : [];

const CartItems = () => {
  const cartItems = useSelector((state) => state.cartItems.items);

  return (
    <div className='flex-1'>
      <h1 className='text-2xl pb-6'>
        <span className='font-bold'>Cart</span> {cartItems.length} Items
      </h1>
      <div className='shadow-card-shadow rounded-md'>
        <div className='bg-light p-8'>
          <h2 className='font-bold text-2xl text-fontColor'>
            Free shipping, arrives tomorrow.
          </h2>
        </div>

        <div className=' p-4 '>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <CartItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.totalPrice}
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
