import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { cartActions } from '../../store/cartItems';
const AddToCartBtn = ({ title, price, id, image }) => {
  const [btnState, setBtnState] = useState({
    clicked: false,
    content: 'Add to cart',
  });
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  const itemQuantity = useSelector(
    (state) => state.cartItems.items.find((item) => item?.id === id)?.quantity
  );

  useEffect(() => {
    if (itemQuantity) {
      setBtnState(() => {
        return { clicked: true, content: ' added' };
      });
      setQuantity(itemQuantity);
    }
  }, [quantity]);

  const addToCartFirstTimeHandler = () => {
    setBtnState(() => {
      return { clicked: true, content: ' added' };
    });
    setQuantity((prev) => prev + 1);
    dispatch(cartActions.addItem({ title, price, id, image }));
  };

  const addToCart = () => {
    dispatch(cartActions.addItem({ title, price, id, image }));
    setQuantity((prev) => prev + 1);
  };

  const removeFromCart = () => {
    dispatch(cartActions.removeItem(id));
    setQuantity((prev) => prev - 1);
    if (quantity === 1) {
      setBtnState({ clicked: false, content: 'Add to cart' });
    }
  };

  return (
    <div
      className={`bg-primary 
    ${btnState.clicked ? 'w-40 p-1' : 'w-fit active:bg-after hover:bg-after'}
    rounded-full flex justify-between  items-center text-white`}
    >
      {!btnState.clicked && (
        <button
          onClick={addToCartFirstTimeHandler}
          className='font-medium py-2 px-6'
        >
          <span> {btnState.content} </span>
        </button>
      )}

      {btnState.clicked && (
        <>
          <button
            className='hover:bg-medium p-2 rounded-full'
            onClick={removeFromCart}
          >
            <FaMinus />
          </button>
          <span className='font-medium flex-1 text-center'>
            {quantity + btnState.content}{' '}
          </span>
          <button
            className='hover:bg-medium p-2 rounded-full'
            onClick={addToCart}
          >
            <FaPlus />
          </button>
        </>
      )}
    </div>
  );
};
export default AddToCartBtn;