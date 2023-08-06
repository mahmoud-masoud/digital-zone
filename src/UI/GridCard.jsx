const GridCard = ({ img, title, price }) => {
  return (
    <div className='flex flex-col justify-between bg-white px-4 py-2 rounded-lg'>
      <div className='mb-2 flex items-end'>
        <img
          src={img}
          alt={title}
          loading='lazy'
          width={500}
          height={500}
          className='max-w-full h-auto'
        />
      </div>
      <div>
        <p className='font-semibold text-sm'>{title}</p>
        <span>{price}</span>
      </div>
    </div>
  );
};
export default GridCard;
