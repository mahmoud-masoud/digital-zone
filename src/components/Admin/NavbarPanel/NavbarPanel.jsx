import { NavLink } from 'react-router-dom';
import { FaBoxesStacked } from 'react-icons/fa6';
import { BsPeopleFill } from 'react-icons/bs';
import { IoMdPricetags } from 'react-icons/io';
import { GoHomeFill } from 'react-icons/go';

const NavbarPanel = () => {
  return (
    <div className='fixed top-16 flex-shrink-0 bg-zinc-200 p-4 w-72 h-screen'>
      <nav>
        <ul className='flex flex-col gap-3'>
          <li>
            <NavLink
              end
              to={'/admin'}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? 'bg-white' : 'hover:bg-white hover:bg-opacity-40'
                }`;
              }}
            >
              <div
                className='flex items-center gap-3 py-1 px-4 
              '
              >
                <GoHomeFill className='text-2xl text-gray-600' />
                <span className='text-lg font-medium'>Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to={'orders'}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? 'bg-white' : 'hover:bg-white hover:bg-opacity-40'
                }`;
              }}
            >
              <div className='flex items-center gap-3  py-1 px-4'>
                <FaBoxesStacked className='text-2xl text-gray-600' />
                <span className='text-lg font-medium'>Orders</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'products'}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? 'bg-white' : 'hover:bg-white hover:bg-opacity-40'
                }`;
              }}
            >
              <div className='flex items-center gap-3  py-1 px-4'>
                <IoMdPricetags className='text-2xl text-gray-600' />
                <span className='text-lg font-medium'>Products</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to={'customers'}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? 'bg-white' : 'hover:bg-white hover:bg-opacity-40'
                }`;
              }}
            >
              <div className='flex items-center gap-3 py-1 px-4'>
                <BsPeopleFill className='text-2xl text-gray-600' />
                <span className='text-lg font-medium'>Customers</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NavbarPanel;
