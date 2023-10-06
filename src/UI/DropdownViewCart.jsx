import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

const DropdownViewCart = ({ hideDropdown, image, title, price }) => {
  return createPortal(
    <>
      <div
        onClick={() => hideDropdown()}
        className='fixed right-0 left-0 top-0 bottom-0 bg-overlay z-[1000]'
      ></div>

      <motion.dialog
        open
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className='w-full max-w-[500px]  rounded-b-xl bg-white p-4 pb-6
          fixed top-0  z-[1000]'
      >
        <div className='flex gap-4 flex-col'>
          <div className='flex justify-between items-center gap-4'>
            <div className='aspect-square w-20 h-20 flex justify-center items-center'>
              <img
                src={image}
                alt='product image'
                className='max-h-full max-w-full object-contain'
              />
            </div>
            <div className='font-medium'>
              <p className='line-clamp-2 text-sm'>{title}</p>
              <span className='text-emerald-600'>Added to cart</span>
            </div>
            <span className='font-bold text-lg'>${price}</span>
          </div>

          <div className='flex justify-between gap-8 h-10 text-sm'>
            <button
              className='flex-1 px-4 py-2 bg-primary text-white font-semibold
            rounded-md hover:bg-after transition'
            >
              <Link to={'/cart'}>Checkout</Link>
            </button>
            <button
              onClick={() => hideDropdown()}
              className='flex-1 px-4 py-2 text-fontColor border border-primary
              rounded-md hover:bg-light transition'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.dialog>
    </>,

    document.getElementById('layout')
  );
};

export default DropdownViewCart;
