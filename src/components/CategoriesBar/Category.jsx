const Category = ({ img, title }) => {
  return (
    <div
      className='flex flex-col items-center
     justify-between flex-1 bg-light p-2 rounded-xl'
    >
      <div
        className=' w-[100px]  h-[100px] flex items-center
       justify-center overflow-hidden md:w-[150px] md:h-[150px] p-2 rounded-lg'
      >
        <img src={img} alt={title} className='max-w-full' />
      </div>
      <p className='pt-2 font-extrabold text-sm text-fontColor'>{title}</p>
    </div>
  );
};
export default Category;
