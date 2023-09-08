import { useDispatch, useSelector } from 'react-redux';
import { favoritesActions } from '../store/favorites';
import HeartIcon from './HeartIcon';
import { useEffect } from 'react';
import { addProductToFavorites, getProduct } from '../Utils/firebase-functions';
import { auth } from '../Utils/firebase';
import { useLocation } from 'react-router-dom';

const AddToFavoritesBtn = ({ title, price, id, image }) => {
  const location = useLocation();
  const pathAfterDomain = location.pathname.split('/');
  const category = pathAfterDomain[1];

  const func = async () => {
    const userUID = auth?.currentUser?.uid;
    const product = await getProduct(category, id);
    addProductToFavorites(userUID, { ...product, id });
  };
  const dispatch = useDispatch();
  const favListItems = useSelector((state) => state.favorites.favoritesItems);
  const isItemInFavList = favListItems.find((item) => item.id === id);

  const addItemToFavList = (e) => {
    dispatch(favoritesActions.addItem({ title, price, id, image }));
    e.preventDefault();
    func();
  };

  return (
    <button
      className='absolute top-2 right-2 z-10 flex justify-center items-center bg-white p-0.5 w-8 h-8 rounded-full'
      onClick={addItemToFavList}
    >
      <HeartIcon className='' setBg={isItemInFavList} id={id} />
    </button>
  );
};
export default AddToFavoritesBtn;
