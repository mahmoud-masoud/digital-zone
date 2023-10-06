import Wrapper from '../../UI/Wrapper';
import Logo from '../../UI/Logo';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className='bg-primary h-16 w-full flex justify-center items-center sticky top-0 p-2 z-10'>
      <Wrapper className={'flex gap-20'}>
        <Link to='/'>
          <Logo />
        </Link>
        <h1 className='font-semibold text-white text-2xl'>
          Create New Product
        </h1>
      </Wrapper>
    </nav>
  );
};
export default AdminNavbar;
