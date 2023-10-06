import AddToFavoritesBtn from './AddToFavoritesBtn';
import CardAddToCart from './CardAddToCart';

const HomePageCard = ({ img, title, price, id }) => {
  return (
    <div className='flex flex-col justify-between rounded-lg relative max-w-40'>
      <AddToFavoritesBtn image={img} title={title} price={price} id={id} />
      <div className='mb-2 flex items-end relative'>
        <div className='absolute bottom-0 transform translate-y-1/2'>
          <CardAddToCart image={img} title={title} price={price} id={id} />
        </div>
        <div className='aspect-square w-40 flex justify-center items-center'>
          <img
            src={img}
            alt={title}
            loading='lazy'
            width='150'
            height='150'
            className='max-w-full max-h-full object-contain'
          />
        </div>
      </div>
      <div className='mt-6'>
        <span className='font-bold text-xl block mb-2'>
          <small>$</small>
          {price}
        </span>
        <p className='line-clamp-3'>{title}</p>
      </div>
    </div>
  );
};
export default HomePageCard;
