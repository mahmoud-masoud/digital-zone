const ProductColors = () => {
  return (
    <div className='colors my-4 font-medium'>
      <h4 className='mb-2'>Colors</h4>

      <div className='flex gap-2 bb-2 py-4'>
        <button
          className='border-2 border-gray-300 p-1 rounded-md focus:border-black
        hover:border-gray-400'
        >
          <span className='bg-pink-500 w-7 h-7 rounded-full block'></span>
        </button>
        <button
          className='border-2 border-gray-300 p-1 rounded-md focus:border-black 
        hover:border-gray-400'
        >
          <span className='bg-orange-500 w-7 h-7 rounded-full block'></span>
        </button>
        <button
          className='border-2 border-gray-300 p-1 rounded-md focus:border-black 
        hover:border-gray-400'
        >
          <span className='bg-purple-500 w-7 h-7 rounded-full block'></span>
        </button>
      </div>
    </div>
  );
};
export default ProductColors;
