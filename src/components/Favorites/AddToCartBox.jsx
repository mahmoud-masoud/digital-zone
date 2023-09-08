import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartItems';

const AddToCartBox = () => {
  const dispatch = useDispatch();
  const favoritesTotalPrice = useSelector(
    (state) => state.favorites.totalPrice
  );

  const favoritesItems = useSelector((state) => state.favorites.favoritesItems);

  const addAllFavoritesItemsToCart = () => {
    dispatch(
      cartActions.addAllFavoritesItems({ favoritesItems, favoritesTotalPrice })
    );
  };

  return (
    <section
      className='sticky bg-white top-[74px] md:top-24 -order-1 md:order-1
    w-full p-4 md:w-1/3  min-w-[300px] 
    md:shadow-card-shadow md:p-6 md:rounded-lg '
    >
      <div className='flex gap-4 items-end md:block md:bb-2 pb-4'>
        <h2 className='font-bold text-xl'>{`$${favoritesTotalPrice}`}</h2>
        <span className='text-sm'>Estimated total</span>
      </div>
      <button
        className='w-full rounded-full bg-primary hover:bg-after
         text-white px-2 py-2 font-bold text-sm md:mt-4'
        onClick={addAllFavoritesItemsToCart}
      >
        Add all to cart
      </button>
    </section>
  );
};
export default AddToCartBox;
