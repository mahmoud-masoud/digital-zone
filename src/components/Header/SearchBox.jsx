import { CiSearch } from 'react-icons/ci';
const SearchBox = () => {
  return (
    <form action='' className='w-full flex-1 md:w-80'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search'
          className='w-full p-2 h-10 pl-4 outline-0 focus:shadow-search-shadow bg-white rounded-full '
        />
        <CiSearch
          className='bg-secondary  h-[30px] w-[30px] font-thin p-1 text-black rounded-full
         absolute right-[5px] top-[5px]'
        />
      </div>
    </form>
  );
};
export default SearchBox;
