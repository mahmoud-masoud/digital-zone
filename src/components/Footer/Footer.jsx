import Wrapper from '../../UI/Wrapper';

const Footer = () => {
  return (
    <div className='bg-after p-4'>
      <Wrapper
        className={
          'flex justify-between items-center flex-wrap text-white text-center'
        }
      >
        <div className='w-1/2 flex flex-col gap-4 '>
          <a href=''>Link</a>
          <a href=''>Link</a>
          <a href=''>Link</a>
        </div>
        <div className='w-1/2 flex flex-col gap-4 '>
          <a href=''>Link</a>
          <a href=''>Link</a>
          <a href=''>Link</a>
        </div>
        <div className='w-1/2 flex flex-col gap-4 '>
          <a href=''>Link</a>
          <a href=''>Link</a>
          <a href=''>Link</a>
        </div>
        <div className='w-1/2 flex flex-col gap-4 '>
          <a href=''>Link</a>
          <a href=''>Link</a>
          <a href=''>Link</a>
        </div>
      </Wrapper>
    </div>
  );
};
export default Footer;
