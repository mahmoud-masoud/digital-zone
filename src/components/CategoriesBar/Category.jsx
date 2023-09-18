const Category = ({ img, title }) => {
  return (
    <div
      className='text-center flex flex-col items-center
     justify-between flex-1'
    >
      <div
        className='bg-white w-[75px] h-[75px] flex items-center
       justify-center rounded-full p-2 overflow-hidden md:w-[120px] md:h-[120px]'
      >
        <img src={img} alt={title} className='max-w-full' />
      </div>
      <p className='pt-2 text-sm md:font-semibold lg:text-lg'>{title}</p>
    </div>
  );
};
export default Category;
