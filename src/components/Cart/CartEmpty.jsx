import { Link } from 'react-router-dom';
const CartEmpty = () => {
  return (
    <div className='p-4 flex flex-col text-center gap-10 justify-center items-center w-full'>
      <svg
        className='w-[400px] h-[400]'
        xmlns='http://www.w3.org/2000/svg'
        width='200'
        height='200'
        x='0'
        y='0'
        viewBox='0 0 256 256'
      >
        <path
          fill='#0058AD'
          strokeMiterlimit='10'
          d='M115.1 53.5l6.9-28.8c.2-.9 0-1.8-.6-2.6-.6-.7-1.4-1.1-2.4-1.1H21.5C18.8 8.7 11.3 2 11 1.7 9.7.7 7.8.8 6.8 2c-1.1 1.3-1 3.2.2 4.2.1.1 7.2 6.5 9 18.2l8.7 57.5c1 6.4 6.4 11.1 12.9 11.1H97c1.7 0 3-1.3 3-3s-1.3-3-3-3H37.6c-3.5 0-6.4-2.5-6.9-6l-.1-.6L96 70.9c9.4-1.3 16.9-8.2 19.1-17.4zM50 59c0 1.7-1.3 3-3 3s-3-1.3-3-3V35c0-1.7 1.3-3 3-3s3 1.3 3 3zm20 0c0 1.7-1.3 3-3 3s-3-1.3-3-3V35c0-1.7 1.3-3 3-3s3 1.3 3 3zm20 0c0 1.7-1.3 3-3 3s-3-1.3-3-3V35c0-1.7 1.3-3 3-3s3 1.3 3 3zm-59 55c0 7.2 5.8 13 13 13s13-5.8 13-13-5.8-13-13-13-13 5.8-13 13zm20 0c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 7 3.1 7 7zm36-13c-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13-5.8-13-13-13zm0 20c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z'
          fontFamily='none'
          fontSize='none'
          fontWeight='none'
          textAnchor='none'
          transform='scale(2)'
        ></path>
      </svg>

      <div>
        <h1 className='font-bold text-2xl mb-2'>Time to start shopping!</h1>
        <p>Shop from these top categories.</p>

        <div className='mt-10 flex gap-4 items-center justify-center flex-wrap'>
          <Link
            to={'/ct/laptops'}
            className='border-2 border-dark hover:bg-light rounded-full px-4 py-1'
          >
            Laptops
          </Link>
          <Link
            to={'/ct/mobile-phones'}
            className='border-2 border-dark hover:bg-light rounded-full px-4 py-1'
          >
            Mobile Phones
          </Link>
          <Link
            to={'/ct/headphones'}
            className='border-2 border-dark hover:bg-light rounded-full px-4 py-1'
          >
            Headphones
          </Link>
          <Link
            to={'/ct/smart-watches'}
            className='border-2 border-dark hover:bg-light rounded-full px-4 py-1'
          >
            Smart Watches
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartEmpty;
