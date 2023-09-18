import { HiMiniShoppingCart } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { auth, db } from '../../Utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const CartIcon = ({ isInputOnFocus }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [cartQuantity, setCartQuantity] = useState(0);
  useEffect(() => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);

      const cartItemsRef = collection(userRef, 'cartItems');

      const unsubscribe = onSnapshot(cartItemsRef, (querySnapshot) => {
        const cartItemsData = querySnapshot.docs.map((doc) => doc.data());
        setCartQuantity(cartItemsData.length);
      });

      return unsubscribe;
    } catch (error) {
      console.log('error', error);
    }
  }, [user]);

  return (
    <Link
      to={'cart'}
      className={`hover:bg-after focus:bg-after px-4 py-1.5 rounded-full ${
        isInputOnFocus && 'opacity-0 md:opacity-100'
      }`}
    >
      <div className='relative'>
        <HiMiniShoppingCart className='text-3xl text-white' />
        <span
          className='bg-secondary  p-0.5 text-dark w-5 h-5 flex items-center justify-center
         rounded-full absolute -top-2 -right-2'
        >
          {cartQuantity}
        </span>
      </div>
    </Link>
  );
};
export default CartIcon;
