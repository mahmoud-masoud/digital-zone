import { useState } from 'react';
import { FaX } from 'react-icons/fa6';

const CartNote = () => {
  const [isShown, setIsShown] = useState(true);
  return (
    isShown && (
      <div className='bg-dark mb-2 text-white md:rounded-md p-4 flex items-center justify-between gap-3 relative'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 32 32'
          className='fill-primary bg-light h-10 w-10 rounded-full shrink-0 p-1'
        >
          <g transform='translate(0 -1020.362)'>
            <path d='m 18.5098,1024.1455 a 0.50004998,0.50004998 0 0 0 -0.057,0 0.50004998,0.50004998 0 0 0 -0.4199,0.6875 l 2.8222,7.25 -9.7109,0 2.8223,-7.25 a 0.50004998,0.50004998 0 0 0 -0.4883,-0.6875 0.50004998,0.50004998 0 0 0 -0.4492,0.3262 l -3.4922,8.9902 a 0.50004998,0.50004998 0 0 0 -0.031,0.09 0.50004996,0.50004996 0 0 1 -0.2265,-0.6602 l 0.3144,-0.8086 -6.5937,0 c -0.554,0 -1,0.446 -1,1 l 0,0.5 c 0,0.554 0.446,1 1,1 l 26,0 c 0.554,0 1,-0.446 1,-1 l 0,-0.5 c 0,-0.554 -0.446,-1 -1,-1 l -6.6016,0 0.3145,0.8086 a 0.50004997,0.50004997 0 0 1 -0.2286,0.6289 0.50004998,0.50004998 0 0 0 -0.021,-0.059 l -3.4922,-8.9902 a 0.50004998,0.50004998 0 0 0 -0.461,-0.3281 z'></path>
            <path
              fillRule='evenodd'
              d='m 4.5001105,1035.5849 2.4628914,10.6699 c 0.3140788,1.3605 1.5270047,2.3243 2.9238048,2.3243 l 12.2245793,0 c 1.3968,0 2.609726,-0.9638 2.923805,-2.3243 l 2.462891,-10.6699 z m 4.746104,2.7422 a 0.50004998,0.50004998 0 0 1 0.4979906,0.4102 l 1.2461099,6.2382 a 0.50019447,0.50019447 0 1 1 -0.980523,0.1913 l -1.2479995,-6.2305 a 0.50004998,0.50004998 0 0 1 0.4276913,-0.6055 0.50004998,0.50004998 0 0 1 0.057071,-0 z m 4.2342805,0 a 0.50004998,0.50004998 0 0 1 0.515716,0.4473 l 0.7519,6.2383 a 0.50176498,0.50176498 0 1 1 -0.996133,0.1171 l -0.746078,-6.2383 a 0.50004998,0.50004998 0 0 1 0.427804,-0.5605 0.50004998,0.50004998 0 0 1 0.04687,-0 z m 9.263698,0 a 0.50004998,0.50004998 0 0 1 0.494097,0.6094 l -1.248,6.2305 a 0.50043633,0.50043633 0 1 1 -0.982375,-0.1913 l 1.248,-6.2382 a 0.50004998,0.50004998 0 0 1 0.435591,-0.4063 0.50004998,0.50004998 0 0 1 0.05291,-0 z m -4.250004,0 a 0.50004998,0.50004998 0 0 1 0.498104,0.5625 l -0.744189,6.2383 a 0.502438,0.502438 0 1 1 -0.998022,-0.1172 l 0.753903,-6.2382 a 0.50004998,0.50004998 0 0 1 0.449197,-0.4434 0.50004998,0.50004998 0 0 1 0.0412,-0 z'
            ></path>
          </g>
        </svg>
        <p className='text-sm lg:text-[1rem]'>
          Some cart items are selling fast! Check out soon before it's sold out.
        </p>
        <FaX
          className='shrink-0 text-sm'
          onClick={() => {
            setIsShown(false);
          }}
        />
      </div>
    )
  );
};
export default CartNote;