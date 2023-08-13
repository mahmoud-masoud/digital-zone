import EmptyBox from '../../UI/EmptyBox';

const EmptyFavorites = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-10 h-[50vh]'>
      <EmptyBox />
      <h1 className='font-bold text-dark text-2xl'>No Favorite Items</h1>
    </div>
  );
};
export default EmptyFavorites;
