import SearchBox from './SearchBox';
import { FaXbox } from 'react-icons/fa';
const Navbar = () => {
  return (
    <nav
      className='absolute left-0 top-0 bg-white h-screen w-[80%] py-8 pt-24
      md:static md:bg-inherit md:h-auto md:w-auto md:p-0 md:pt-0 md:text-white
      '
    >
      <ul className='flex flex-col gap-5 px-4 md:flex-row md:px-0 md:items-end md:justify-center'>
        <li>Categories</li>
        <li>Deals</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};
export default Navbar;
