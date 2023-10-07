import Wrapper from '../../UI/Wrapper';
import Logo from '../../UI/Logo';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div
      className='bg-primary h-16 w-full flex justify-center items-center fixed
     top-0 p-2 z-10'
    >
      <Wrapper className={'flex gap-20'}>
        <Link to='/'>
          <Logo />
        </Link>
        <h1 className='font-semibold text-white text-2xl'>Admin dashboard</h1>
      </Wrapper>
    </div>
  );
};
export default TopBar;
