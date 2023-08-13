import { Link } from 'react-router-dom';
import { FaRegHeart, FaAngleDown } from 'react-icons/fa6';
import CategoriesMenu from './CategoriesMenu';
import { useState } from 'react';

const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  return (
    <nav
      className='absolute left-0 top-0 bg-white h-screen w-[80%] py-8.5py-1.5 pt-24
      md:static md:bg-inherit md:h-auto md:w-auto md:p-0 md:pt-0 md:text-white
      '
    >
      <ul className='flex flex-col lg:gap-4 px-4 md:flex-row md:px-0 md:items-end md:justify-center'>
        <li
          tabIndex={0}
          className='group hover:bg-after focus:bg-after px-4 py-1.5  rounded-full cursor-pointer'
          onClick={() => setDropDownMenu(!dropDownMenu)}
        >
          <div className='flex items-end gap-0.5'>
            <p>Categories</p> <FaAngleDown />
          </div>
          {dropDownMenu && <CategoriesMenu setDropDownMenu={setDropDownMenu} />}
        </li>

        <Link
          to={'deals'}
          className={'hover:bg-after focus:bg-after px-4 py-1.5 rounded-full'}
        >
          <li>Deals</li>
        </Link>
        <Link
          to={'contact'}
          className={'hover:bg-after focus:bg-after px-4 py-1.5 rounded-full'}
        >
          <li>Contact</li>
        </Link>
        <Link
          to={'favorites'}
          className={'hover:bg-after focus:bg-after px-4 py-1.5 rounded-full'}
        >
          <li className=' flex items-center gap-1'>
            <FaRegHeart /> List
          </li>
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;
