import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import './CarouselStyles.css';

// import required modules
import { Scrollbar, Autoplay } from 'swiper/modules';

const ProductImagesForMobile = ({ images }) => {
  return (
    <>
      <Swiper
        scrollbar={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Scrollbar, Autoplay]}
        className='max-w-full h-full'
      >
        {images.map((imgSrc) => (
          <SwiperSlide>
            <img
              src={imgSrc}
              alt=''
              height='366'
              width='366'
              className='w-full'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default ProductImagesForMobile;
