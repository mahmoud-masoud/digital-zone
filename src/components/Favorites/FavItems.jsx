import { useSelector } from 'react-redux';
import FavItem from './FavItem';

import { useEffect, useState } from 'react';
import { getUserFavorites } from '../../Utils/firebase-functions';
import { auth } from '../../Utils/firebase';

const FavItems = () => {
  // const listItems = useSelector((state) => state.favorites.favoritesItems);
  // const numberOfItems = useSelector((state) => state.favorites.numberOfItems);
  const [favoritesProducts, setFavoritesProducts] = useState([]);
  const userUID = auth?.currentUser?.uid;

  useEffect(() => {
    if (!userUID) return;
    const getFavoriteProducts = async (userUID) => {
      const res = await getUserFavorites(userUID);
      setFavoritesProducts(res);
    };
    getFavoriteProducts(userUID);
  }, [userUID, getUserFavorites]);

  return (
    <section className='flex-1 w-full px-4'>
      <div className='bb-2 mb-4'>
        <h1 className='font-bold text-2xl'>Your Items</h1>
        <span className='py-6 block'>{favoritesProducts?.length} items</span>
      </div>
      <ul>
        {favoritesProducts?.map((item) => (
          <li key={item.id} className='last:border-none bb-2 py-5'>
            <FavItem
              title={item.title}
              image={item.images[0]}
              price={item.price}
              id={item.id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
export default FavItems;
