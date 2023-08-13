import isMobileOrTablet from '../../Utils/isMobileOrTablet';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './CarouselStyles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import CarouselBtns from './ProductBuyBox/CarouselBtns';

const ProductImages = ({ image, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='flex gap-4 h-[500px] mb-8'>
      <div className='relative'>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
          direction='vertical'
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper max-h-full w-[100px]'
        >
          <SwiperSlide className='rounded-md border-2 border-gray-200 p-1'>
            <img src='/images/ProductImages/img1.webp' alt='' />
          </SwiperSlide>

          <SwiperSlide className='rounded-md border-2 border-gray-200 p-1'>
            <img src='/images/ProductImages/img2.webp' alt='' />
          </SwiperSlide>

          <SwiperSlide className='rounded-md border-2 border-gray-200 p-1'>
            <img src='/images/ProductImages/img3.webp' alt='' />
          </SwiperSlide>

          <SwiperSlide className='rounded-md border-2 border-gray-200 p-1'>
            <img src='/images/ProductImages/image4webp.webp' alt='' />
          </SwiperSlide>

          <SwiperSlide className='rounded-md border-2 border-gray-200 p-1'>
            <img src='/images/ProductImages/image5.webp' alt='' />
          </SwiperSlide>

          <SwiperSlide className='rounded-md border-2 border-gray-200 p-1'>
            <img src='/images/ProductImages/image6.webp' alt='' />
          </SwiperSlide>
        </Swiper>

        <button
          className={`prev bg-light flex items-center justify-center
          h-8 w-8 rounded-full z-10 absolute -top-0 right-1/2 -translate-y-1/2 translate-x-1/2`}
        >
          <FaAngleUp />
        </button>

        <button
          className={`next bg-light flex items-center justify-center 
        h-8 w-8 rounded-full z-10 absolute -bottom-0 right-1/2 translate-y-1/2 translate-x-1/2`}
        >
          <FaAngleDown />
        </button>
      </div>

      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Thumbs]}
        className='mySwiper2 max-w-[500px]'
      >
        <SwiperSlide className=''>
          <img src='/images/ProductImages/img1.webp' alt='' />
        </SwiperSlide>
        <SwiperSlide className=''>
          <img src='/images/ProductImages/img2.webp' alt='' />
        </SwiperSlide>
        <SwiperSlide className=''>
          <img src='/images/ProductImages/img3.webp' alt='' />
        </SwiperSlide>
        <SwiperSlide className=''>
          <img src='/images/ProductImages/image4webp.webp' alt='' />
        </SwiperSlide>
        <SwiperSlide className=''>
          <img src='/images/ProductImages/image5.webp' alt='' />
        </SwiperSlide>
        <SwiperSlide className=''>
          <img src='/images/ProductImages/image6.webp' alt='' />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default ProductImages;
