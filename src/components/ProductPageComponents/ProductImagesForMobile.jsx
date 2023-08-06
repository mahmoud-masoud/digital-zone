import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import './CarouselStyles.css';

// import required modules
import { Scrollbar, Autoplay } from 'swiper/modules';

const ProductImagesForMobile = () => {
  return (
    <>
      <Swiper
        scrollbar={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Scrollbar, Autoplay]}
        className='max-w-full max-h-[500px]'
      >
        <SwiperSlide>
          <img src='/images/ProductImages/img1.webp' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/images/ProductImages/img2.webp' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/images/ProductImages/img3.webp' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='/images/ProductImages/image4webp.webp'
            alt=''
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default ProductImagesForMobile;
