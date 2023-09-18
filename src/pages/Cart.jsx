import Wrapper from '../UI/Wrapper';
import CartCheckout from '../components/Cart/CartCheckout';
import CartItems from '../components/Cart/CartItems';
import CartEmpty from '../components/Cart/CartEmpty';
import { cartItemsActions } from '../store/cartItems';
import { auth, db } from '../Utils/firebase';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

import Loading from '../UI/Loading';
import { useDispatch } from 'react-redux';
const Cart = () => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [cartItemsLoading, setCartItemsLoading] = useState(true);
  const [cartItemsError, setCartItemsError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);

      const cartItemsRef = collection(userRef, 'cartItems');

      const unsubscribe = onSnapshot(cartItemsRef, (querySnapshot) => {
        const cartItemsData = querySnapshot.docs.map((doc) => doc.data());
        setCartItems(cartItemsData);
        dispatch(cartItemsActions.addCartItems(cartItems));
        setCartItemsLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      setCartItemsLoading(false);
      setCartItemsError(true);
    }
  }, [user]);

  const cartContent =
    !cartItems.length && !userLoading && !cartItemsLoading ? (
      <CartEmpty />
    ) : (
      <>
        <CartItems cartItems={cartItems} />
        <CartCheckout cartItems={cartItems} />
      </>
    );

  return (
    <Wrapper className='flex flex-col md:flex-row gap-8 p-4'>
      {userLoading || cartItemsLoading ? <Loading /> : cartContent}
    </Wrapper>
  );
};
export default Cart;
