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
        className='max-w-full h-full'
      >
        <SwiperSlide>
          <img
            src='../../../public/images/ProductImages/img1.webp'
            alt=''
            height='366'
            width='366'
            className='w-full'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='../../../public/images/ProductImages/img2.webp'
            alt=''
            height='366'
            width='366'
            className='w-full'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='../../../public/images/ProductImages/img3.webp'
            alt=''
            height='366'
            width='366'
            className='w-full'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='/images/ProductImages/image4webp.webp'
            alt=''
            height='366'
            width='366'
            className='w-full'
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default ProductImagesForMobile;
