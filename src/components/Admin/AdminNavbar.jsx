import Wrapper from '../../UI/Wrapper';
import { Link } from 'react-router-dom';
const AdminNavbar = () => {
  return (
    <div className='bg-primary h-16 w-full flex justify-center items-center sticky top-0 p-2 z-10'>
      <Wrapper className={'flex gap-4'}>
        <h1 className='font-semibold text-white text-xl'>
          Admin Create New Product
        </h1>
        <Link to='/'>go to home</Link>
      </Wrapper>
    </div>
  );
};
export default AdminNavbar;
