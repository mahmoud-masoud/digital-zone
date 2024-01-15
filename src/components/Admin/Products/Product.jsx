const Product = ({ img, title }) => {
  return (
    <div className='flex items-center gap-4 p-4 hover:bg-light hover:bg-opacity-50'>
      <div
        className='w-12 h-12 flex justify-center items-center 
      border border-gray-300 p-1 rounded-md'
      >
        <img src={img} alt={title} className='max-h-full' />
      </div>
      <span>{title}</span>
    </div>
  );
};
export default Product;
