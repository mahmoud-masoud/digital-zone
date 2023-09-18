import { TbHeartPlus } from 'react-icons/tb';

const EmptyFavorites = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-10 h-[50vh]'>
      <TbHeartPlus className=' text-after h-36 w-36' />
      <h1 className='font-bold text-dark text-2xl'>No Favorite Items</h1>
    </div>
  );
};
export default EmptyFavorites;
