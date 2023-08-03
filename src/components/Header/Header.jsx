import Navbar from './Navbar';
import Wrapper from '../../UI/Wrapper';
import SearchBox from './SearchBox';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { FaX, FaBars } from 'react-icons/fa6';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import isMobileOrTablet from '../../Utils/isMobileOrTablet';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navHandler = () => {
    setIsOpen(!isOpen);
  };

  const cartQuantity = useSelector((state) => state.cartItems.quantity);

  return (
    <header className='bg-primary mb-10 p-4'>
      <Wrapper
        className={
          'flex flex-wrap gap-4 md:flex-row items-center  md:justify-between'
        }
      >
        <button className='z-[110000] text-light' onClick={navHandler}>
          {isOpen ? (
            <FaX className='text-3xl md:hidden text-fontColor' />
          ) : (
            <FaBars className='text-3xl md:hidden' />
          )}
        </button>
        <Link to={'/'}>
          <h1 className='text-white'>LOGO</h1>
        </Link>

        <SearchBox />

        {isMobileOrTablet && isOpen && <Navbar />}
        {!isMobileOrTablet && <Navbar />}

        <Link to={'cart'}>
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
