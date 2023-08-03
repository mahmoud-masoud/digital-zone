import isMobileOrTablet from '../../Utils/isMobileOrTablet';
const ProductImages = ({ image, title }) => {
  return (
    <div className='flex gap-8 justify-around mb-4'>
      <div className='vertical-carousel hidden md:block bg-light'>
        Vertical Carousel
      </div>
      <div className='img-box max-w-[600px] flex items-center justify-center'>
        <img src={image} alt={title} className='max-w-full' />
      </div>
    </div>
  );
};
export default ProductImages;
