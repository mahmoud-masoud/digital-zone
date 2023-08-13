import { useSelector } from 'react-redux';
import FavItem from './FavItem';

const FavItems = () => {
  const listItems = useSelector((state) => state.favorites.favoritesItems);
  const numberOfItems = useSelector((state) => state.favorites.numberOfItems);
  return (
    <section className='flex-1 w-full px-4'>
      <h1 className='font-bold text-2xl'>Your Items</h1>
      <span className='py-6 block bb-2 mb-4'>{numberOfItems} items</span>
      <ul>
        {listItems.map((item) => (
          <li key={item.id} className='last:border-none bb-2 py-5'>
            <FavItem
              title={item.title}
              image={item.image}
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
