import AddToFavoritesBtn from './AddToFavoritesBtn';
import CardAddToCart from './CardAddToCart';

const HomePageCard = ({ img, title, price, id }) => {
  return (
    <div className='flex flex-col justify-between  px-4 py-2 rounded-lg relative'>
      <AddToFavoritesBtn image={img} title={title} price={price} id={id} />
      <div className='mb-2 flex items-end relative'>
        <div className='absolute bottom-0 transform translate-y-1/2'>
          <CardAddToCart image={img} title={title} price={price} id={id} />
        </div>
        <img
          src={img}
          alt={title}
          loading='lazy'
          width='200'
          height='200'
          className='max-w-full h-auto'
        />
      </div>
      <div className='mt-6'>
        <span className='font-bold text-xl block mb-2'>
          <small>$</small>
          {price}
        </span>
        <p className=''>{title}</p>
      </div>
    </div>
  );
};
export default HomePageCard;
