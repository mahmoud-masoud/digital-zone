import CartNote from './CartNote';

const MobileCheckout = () => {
  return (
    <div className='w-full shadow-card-shadow fixed bottom-0 right-0 bg-white z-[10000]'>
      <CartNote />
      <div className='bb-2 p-4 flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <span className='font-bold'>Estimated total</span>
          <span className='text-green-700 font-bold'>$599</span>
        </div>
        <button className='w-full bg-primary font-bold text-white px-4 py-2 rounded-full'>
          Continue to checkout
        </button>
      </div>
    </div>
  );
};
export default MobileCheckout;
