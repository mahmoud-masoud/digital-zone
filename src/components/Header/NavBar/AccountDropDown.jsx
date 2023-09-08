import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../Utils/firebase';
import { signOut } from 'firebase/auth';

const AccountDropDown = ({
  isAccountDropdown,
  closeAccountDropDown,
  openAccountDropDown,
}) => {
  return (
    <div className='absolute top-full'>
      <div
        className='bg-white text-fontColor -translate-x-1/2 shadow-lg
         rounded-b-xl flex flex-col p-4 border-2 border-t-0
        items-center justify-center relative z-[5]'
        onClick={closeAccountDropDown}
      >
        <Link
          to={'/signup'}
          className='px-4 py-1.5 mb-2 bg-primary hover:bg-after rounded-full text-white text-sm font-medium'
        >
          Sign in or create account
        </Link>

        <a
          href=''
          onClick={() => {
            closeAccountDropDown();
            signOut(auth);
          }}
        >
          Sign Out
        </a>
        <Link to={'admin'} onClick={closeAccountDropDown}>
          Admin
        </Link>
      </div>
      <div
        className='fixed right-0 left-0 top-[84px] bottom-0 bg-[#0006] z-[4]'
        onClick={closeAccountDropDown}
      ></div>
    </div>
  );
};
export default AccountDropDown;
