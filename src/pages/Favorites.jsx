import { useSelector } from 'react-redux';
import Wrapper from '../UI/Wrapper';
import AddToCartBox from '../components/Favorites/AddToCartBox';
import FavItems from '../components/Favorites/FavItems';

import EmptyFavorites from '../components/Favorites/EmptyFavorites';

const Favorites = () => {
  const favoriteItems = useSelector((state) => state.favorites.favoritesItems);

  return (
    <Wrapper className='flex flex-col md:flex-row gap-8 items-start '>
      {favoriteItems.length > 0 ? (
        <>
          <FavItems />
          <AddToCartBox />
        </>
      ) : (
        <EmptyFavorites />
      )}
    </Wrapper>
  );
};
export default Favorites;
