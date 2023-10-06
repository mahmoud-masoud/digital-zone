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
import ProductImg from './ProductImg';
import { rule } from 'postcss';

// import CarouselBtns from './ProductBuyBox/CarouselBtns';

const ProductImages = ({ images, title }) => {
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
          {images?.map((url) => {
            return (
              <SwiperSlide
                key={url}
                className='rounded-md border-2 border-gray-200 p-1 
                flex justify-center items-center'
              >
                {/* <ProductImg url={url} /> */}
                <img
                  src={url}
                  alt=''
                  loading='lazy'
                  className='max-w-full max-h-full'
                />
              </SwiperSlide>
            );
          })}
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
        {images?.map((url) => {
          return (
            <SwiperSlide key={url} className='flex justify-center items-center'>
              <img
                src={url}
                alt=''
                loading='lazy'
                width={'auto'}
                height={500}
                className='max-w-full max-h-full'
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default ProductImages;
