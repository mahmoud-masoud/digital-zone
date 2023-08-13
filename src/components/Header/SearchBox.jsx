import { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaX } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ALL_PRODUCTS from '../../data';
const SearchBox = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const closeSuggestions = (e) => {
      if (!e.target.closest('.search-box')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', closeSuggestions);
    return () => {
      document.removeEventListener('click', closeSuggestions);
    };
  }, []);

  const handleSuggestionClick = () => {
    setShowSuggestions(false);
  };

  return (
    <>
      <form
        className={`${showSuggestions && 'px-4'} md:p-0
         flex gap-2 search-box w-full flex-1 md:w-80 md:static
    ${showSuggestions && 'absolute transition right-0'}`}
      >
        <div className='relative flex-1 w-full'>
          <input
            type='text'
            placeholder='Search'
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            className={`rounded-full w-full p-2 h-10 pl-4 pr-16 focus:transition
          ${showSuggestions && 'rounded-none'}`}
            onClick={() => setShowSuggestions(true)}
          />
          <div className='absolute right-[5px] top-[5px] flex gap-2 bg-sky-'>
            <button
              type='button'
              className={`text-gray-600 text-[12px] ${
                searchInput === '' && 'hidden'
              }`}
              onClick={() => setSearchInput('')}
            >
              <FaX />
            </button>
            <button className='bg-secondary rounded-full'>
              <CiSearch className=' h-[30px] w-[30px] font-thin p-1 text-black' />
            </button>
          </div>
          {/* Suggestions Box */}
          {showSuggestions && (
            <div
              className='w-full bg-white h-screen md:h-auto fixed left-0 top-[74px]
            md:absolute md:top-[42px] shadow-lg p-4 transition'
            >
              <ul>
                <li onClick={handleSuggestionClick}>
                  <Link to={'laptops'}>go to home</Link>
                </li>
                <li onClick={handleSuggestionClick}>
                  <Link to={'laptops'}>go to home</Link>
                </li>
                <li onClick={handleSuggestionClick}>
                  <Link to={'laptops'}>go to home</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {showSuggestions && (
          <button
            type='button'
            className='md:hidden text-white underline'
            onClick={handleSuggestionClick}
          >
            Cancel
          </button>
        )}
      </form>
    </>
  );
};
export default SearchBox;
