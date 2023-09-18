import Wrapper from '../UI/Wrapper';
import AddToCartBox from '../components/Favorites/AddToCartBox';
import FavItems from '../components/Favorites/FavItems';

import EmptyFavorites from '../components/Favorites/EmptyFavorites';

const Favorites = () => {
  return (
    <Wrapper className='flex flex-col md:flex-row gap-8 items-start '>
      {/* {favoriteItems.length > 0 ? (
      ) : (
        <EmptyFavorites />
      )} */}
      <>
        <FavItems />
        <AddToCartBox />
      </>
    </Wrapper>
  );
};
export default Favorites;
