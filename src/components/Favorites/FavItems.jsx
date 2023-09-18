import { useDispatch } from 'react-redux';
import FavItem from './FavItem';

import { useEffect, useState } from 'react';
import { auth, db } from '../../Utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../UI/Loading';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { favoritesActions } from '../../store/favorites';

const FavItems = () => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const [userAvailable, setUserAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoading && user) {
      setUserAvailable(true);
    }
    if (!user || userLoading) {
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const favoritesRef = collection(userRef, 'favorites');

    const unsubscribe = onSnapshot(
      favoritesRef,
      (querySnapshot) => {
        const favoritesItems = querySnapshot.docs.map((doc) => doc.data());
        setFavorites(favoritesItems);
        dispatch(favoritesActions.addFavorites(favoritesItems));
        setLoading(false);
      },
      (error) => {
        console.error('Error in onSnapshot:', error);
        setLoading(false);
        setError(true);
      }
    );

    return () => unsubscribe();
  }, [user, userAvailable]);

  return (
    <>
      {loading && !error ? (
        <Loading />
      ) : (
        <section className='flex-1 w-full px-4'>
          <div className='bb-2 mb-4'>
            <h1 className='font-bold text-2xl'>Your Items</h1>
            <span className='py-6 block'>{favorites?.length} items</span>
          </div>
          <ul>
            {favorites?.map((item) => (
              <li key={item.id} className='last:border-none bb-2 py-5'>
                <FavItem
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  id={item.id}
                  fetchedNeededQuantity={item.neededQuantity}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
export default FavItems;
