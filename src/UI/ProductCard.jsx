const ProductCard = ({ img, title, price }) => {
  return (
    <div className='flex flex-col justify-between '>
      {/* img box */}
      <div className='mb-2 flex items-end'>
        <img
          src={img}
          alt={title}
          loading='lazy'
          className='w-full'
          height='200'
          width='200'
        />
      </div>
      <div>
        <p className='font-semibold text-sm'>{title}</p>
        <span>{`$${price}`}</span>
      </div>
    </div>
  );
};
export default ProductCard;
