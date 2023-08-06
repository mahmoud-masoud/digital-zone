import { NavLink } from 'react-router-dom';
import { FaRegHeart, FaAngleDown } from 'react-icons/fa6';
const Navbar = () => {
  return (
    <nav
      className='absolute left-0 top-0 bg-white h-screen w-[80%] py-8.5py-1.5 pt-24
      md:static md:bg-inherit md:h-auto md:w-auto md:p-0 md:pt-0 md:text-white
      '
    >
      <ul className='flex flex-col lg:gap-4 px-4 md:flex-row md:px-0 md:items-end md:justify-center'>
        <NavLink
          to={'categories'}
          className={'hover:bg-after focus:bg-after px-4 py-1.5 rounded-full'}
        >
          <li className='flex items-end gap-0.5'>
            Categories <FaAngleDown />{' '}
          </li>
        </NavLink>
        <NavLink
          to={'deals'}
          className={'hover:bg-after focus:bg-after px-4 py-1.5 rounded-full'}
        >
          <li>Deals</li>
        </NavLink>
        <NavLink
          to={'contact'}
          className={'hover:bg-after focus:bg-after px-4 py-1.5 rounded-full'}
        >
          <li>Contact</li>
        </NavLink>
        <NavLink
          to={'fav-list'}
          className={'hover:bg-after focus:bg-after px-4 py-1.5 rounded-full'}
        >
          <li className=' flex items-center gap-1'>
            <FaRegHeart /> List
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};
export default Navbar;
