import Navbar from './NavBar/Navbar';
import Wrapper from '../../UI/Wrapper';
import SearchBox from './SearchBox';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { HiMiniBars3 } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../UI/Logo';
import MobileNavbar from './NavBar/MobileNavbar';

const Header = () => {
  const [isInputOnFocus, setInputOnFocus] = useState(false);

  const handleInputOnFocus = () => {
    setInputOnFocus(false);
  };

  const [navbarIsOpen, setNavbar] = useState(false);
  const navHandler = () => {
    setNavbar(!navbarIsOpen);
  };

  const closeNavbar = () => {
    setNavbar(false);
  };

  useEffect(() => {
    if (navbarIsOpen) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'auto';
    }
  }, [navbarIsOpen]);

  const cartQuantity = useSelector((state) => state.cartItems.quantity);

  return (
    <header className='bg-primary mb-8 p-4 sticky top-0 z-[100000]'>
      <Wrapper
        className={
          'flex flex-wrap gap-2 md:gap-4 md:flex-row items-center md:justify-between'
        }
      >
        <button
          className={`z-[10000] text-white ${isInputOnFocus && 'opacity-0'}`}
          onClick={navHandler}
        >
          {!navbarIsOpen && <HiMiniBars3 className='text-3xl md:hidden' />}
        </button>
        <Link to={'/'}>
          <Logo />
        </Link>

        <SearchBox
          isInputOnFocus={isInputOnFocus}
          setInputOnFocus={setInputOnFocus}
          handleInputOnFocus={handleInputOnFocus}
        />

        {navbarIsOpen && <MobileNavbar closeNavbar={closeNavbar} />}
        <Navbar />

        <Link
          to={'cart'}
          className={`hover:bg-after focus:bg-after px-4 py-1.5 rounded-full ${
            isInputOnFocus && 'opacity-0 md:opacity-100'
          }`}
        >
          <div className='relative'>
            <HiMiniShoppingCart className='text-3xl text-white' />
            <span
              className='bg-secondary  p-0.5 text-dark w-5 h-5 flex items-center justify-center
               rounded-full absolute -top-2 -right-2'
            >
              {cartQuantity}
            </span>
          </div>
        </Link>
      </Wrapper>
    </header>
  );
};
export default Header;
