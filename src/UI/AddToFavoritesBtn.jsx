import HeartIcon from './HeartIcon';
import { useEffect, useState } from 'react';
import { addProductToFavorites } from '../Utils/firebase-functions';
import { auth, db } from '../Utils/firebase';
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

const AddToFavoritesBtn = ({ title, price, id, image }) => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);
  const location = useLocation();
  const pathAfterDomain = location.pathname.split('/');
  const category = pathAfterDomain[1];
  const [isFavorite, setIsFavorite] = useState(false);

  const addItemToFavList = (e) => {
    e.preventDefault();
    addProductToFavorites(user.uid, { title, price, image, id });
  };

  useEffect(() => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const favoriteItemRef = collection(userRef, 'favorites');

      const q = query(favoriteItemRef, where('id', '==', id));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          setIsFavorite(true);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.log('error from catch', error);
    }
  }, [user]);

  return (
    <button
      className='absolute top-2 right-2 z-10 flex justify-center items-center bg-white p-0.5 w-8 h-8 rounded-full'
      onClick={addItemToFavList}
    >
      <HeartIcon className='' setBg={isFavorite} id={id} />
    </button>
  );
};
export default AddToFavoritesBtn;
