import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from 'react';
import MobileAccountAvatar from './MobileAccountAvatar';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '../../../Utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AnimatePresence, motion } from 'framer-motion';
const MobileNavbar = ({ closeNavbar, navbarIsOpen }) => {
  const [accordion, setAccordion] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: '-100%' },
  };
  const handleAccordionBlur = () => {
    setTimeout(() => {
      setAccordion(false);
    }, 100);
  };
  return (
    <motion.nav
      initial='hidden'
      animate={navbarIsOpen ? 'visible' : 'hidden'}
      variants={variants}
      className='absolute left-0 top-0 h-screen w-screen md:hidden'
    >
      <button
        className='absolute w-full left-0 top-0 bottom-0 right-0 bg-transparent'
        onClick={closeNavbar}
      ></button>
      <button
        className='absolute z-10 text-3xl top-14 left-[270px]'
        onClick={closeNavbar}
      >
        <IoCloseSharp />
      </button>

      {
        <ul
          className='flex flex-col px-4 w-[320px] absolute left-0 h-full 
      py-20 border-r border-3 bg-white'
        >
          <MobileAccountAvatar />

          <li className='text-xl'>
            <button
              className=' w-full group'
              onClick={() => {
                setAccordion(!accordion);
              }}
              onBlur={handleAccordionBlur}
            >
              <div className='flex items-center gap-1 py-4'>
                <p>Categories</p>
                <FaAngleDown className='group-focus:rotate-180 transition duration-300 text-sm' />
              </div>
            </button>
            <div
              className={`overflow-hidden h-0 text-lg pl-3 ${
                accordion && 'h-[180px] mb-2'
              } transition-all duration-300`}
            >
              <Link
                to={'mobile-phones'}
                className='block w-full hover:text-after hover:underline pb-2 border-b border-[#f1f1f1]'
                onClick={closeNavbar}
              >
                Mobile Phones
              </Link>

              <Link
                to={'headphones'}
                className='block w-full hover:text-after hover:underline border-b border-[#f1f1f1] py-2'
                onClick={closeNavbar}
              >
                Headphones
              </Link>

              <Link
                to={'smart-watches'}
                className='block w-full hover:text-after hover:underline border-b border-[#f1f1f1] py-2'
                onClick={closeNavbar}
              >
                Smart Watches
              </Link>

              <Link
                to={'laptops'}
                className='block w-full hover:text-after hover:underline border-b border-[#f1f1f1] py-2'
                onClick={closeNavbar}
              >
                Laptops
              </Link>
            </div>
          </li>

          <li className='text-xl py-4' onClick={closeNavbar}>
            <Link to={'deals'}>Deals</Link>
          </li>
          <li className='text-xl py-4' onClick={closeNavbar}>
            <Link to={'contact'}>Contact</Link>
          </li>
          <li
            className='text-xl py-4 flex items-center gap-1'
            onClick={closeNavbar}
          >
            <Link to={'favorites'}>Favorites</Link>
          </li>

          {user && (
            <a
              href=''
              className='mt-auto hover:text-primary'
              onClick={() => {
                auth.signOut();
              }}
            >
              <div className=' flex gap-2 items-center'>
                <span>Logout</span> <FiLogOut />
              </div>
            </a>
          )}
        </ul>
      }
    </motion.nav>
  );
};
export default MobileNavbar;
