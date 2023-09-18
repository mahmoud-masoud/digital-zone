import { useState, useEffect, createContext } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaX } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ALL_PRODUCTS from '../../data';

const SearchBox = ({ setInputOnFocus, isInputOnFocus, handleInputOnFocus }) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const closeSuggestions = (e) => {
      if (!e.target.closest('.search-box')) {
        setInputOnFocus(false);
      }
    };
    document.addEventListener('click', closeSuggestions);
    return () => {
      document.removeEventListener('click', closeSuggestions);
    };
  }, []);

  return (
    <>
      <form
        className={`${isInputOnFocus && 'px-4 z-[100]'} md:p-0
         flex gap-2 search-box w-full transition-all duration-300 flex-1 md:w-80 md:static
    ${isInputOnFocus && 'absolute right-0'}`}
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
          ${isInputOnFocus && 'rounded-none'}`}
            onClick={() => setInputOnFocus(true)}
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
          {isInputOnFocus && (
            <div
              className='w-full bg-white h-screen md:h-auto fixed left-0 top-[74px]
            md:absolute md:top-[42px] shadow-lg p-4 transition'
            >
              <ul>
                <li onClick={handleInputOnFocus}>
                  <Link to={'laptops'}>go to home</Link>
                </li>
                <li onClick={handleInputOnFocus}>
                  <Link to={'laptops'}>go to home</Link>
                </li>
                <li onClick={handleInputOnFocus}>
                  <Link to={'laptops'}>go to home</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {isInputOnFocus && (
          <button
            type='button'
            className='md:hidden text-white underline'
            onClick={handleInputOnFocus}
          >
            Cancel
          </button>
        )}
      </form>
    </>
  );
};
export default SearchBox;
