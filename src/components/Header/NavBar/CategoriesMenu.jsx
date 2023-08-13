import { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoriesMenu = ({ setDropDawnMenu }) => {
  return (
    <ul
      className='absolute text-fontColor bg-white shadow-card-shadow z-[1000] top-full left-1/2
rounded-b-md p-4 flex flex-wrap justify-around gap-4'
    >
      <li
        className='w-[45%] hover:bg-light p-2 rounded-sm'
        onClick={() => setDropDawnMenu(false)}
      >
        <Link to={'mobile-phones'}>
          Mobile Phones
          <img
            src='../../../../public/images/Categories/phone.jpg'
            alt=''
            width={50}
            height={50}
          />
        </Link>
      </li>
      <li
        className='w-[45%] hover:bg-light p-2 rounded-sm'
        onClick={() => setDropDawnMenu(false)}
      >
        <Link to={'laptops'}>
          Laptops
          <img
            src='../../../../public/images/Categories/laptop.png'
            alt=''
            width={50}
            height={50}
          />
        </Link>
      </li>
      <li
        className='w-[45%] hover:bg-light p-2 rounded-sm'
        onClick={() => setDropDawnMenu(false)}
      >
        <Link to={'headphones'}>
          Headphones
          <img
            src='../../../../public/images/Categories/headphone.jpg'
            alt=''
            width={50}
            height={50}
          />
        </Link>
      </li>
      <li
        className='w-[45%] hover:bg-light p-2 rounded-sm'
        onClick={() => setDropDawnMenu(false)}
      >
        <Link to={'smart-watches'}>
          Smart Watches
          <img
            src='../../../../public/images/Categories/smart-watch.png'
            alt=''
            width={70}
            height={70}
          />
        </Link>
      </li>
    </ul>
  );
};
export default CategoriesMenu;
