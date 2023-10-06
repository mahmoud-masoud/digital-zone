import img1 from '/images/Carousel/banner-1.png';
import img2 from '/images/Carousel/banner-2.png';
import img3 from '/images/Carousel/banner-3.png';
import img4 from '/images/Carousel/banner-4.png';

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import './BannersCarousel.css';

import { Pagination, Autoplay } from 'swiper/modules';

const Carousel = () => {
  const images = [img1, img2, img3, img4];

  return (
    <div
      className='container relative mx-auto h-auto 
    flex items-center justify-center px-3 md:p-0'
    >
      <div className='rounded-xl overflow-hidden'>
        <Swiper
          className='w-full'
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
          pagination={{
            clickable: true,
            type: 'bullets',
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.toString()}>
              <picture>
                <source
                  srcSet={`/images/Carousel/small-images/small-${
                    index + 1
                  }.png`}
                  type='image/png'
                  media='(max-width: 768px)'
                  height='300'
                  width='auto'
                />
                <img
                  src={image}
                  alt=''
                  className='max-w-full'
                  height='300'
                  width='auto'
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <button
        className='hidden md:flex prev absolute items-center justify-end -left-[45px]
       h-[70px] w-[70px] bg-white z-10 rounded-full text-3xl text-primary'
      >
        <FaAngleLeft />
      </button>
      <button
        className='hidden md:flex next absolute  items-center justify-start -right-[45px]
       h-[70px] w-[70px] bg-white z-10 rounded-full text-3xl text-primary'
      >
        <FaAngleRight />
      </button> */}
    </div>
  );
};
export default Carousel;

import React from 'react';

// const ResponsiveImage = () => {
//   return (
//     <picture>
//       {/* WebP format for modern browsers */}
//       <source srcSet="image-large.webp" type="image/webp" media="(min-width: 1024px)" />
//       <source srcSet="image-medium.webp" type="image/webp" media="(min-width: 768px)" />
//       <source srcSet="image-small.webp" type="image/webp" />

//       {/* Fallback for non-WebP supported browsers */}
//       <source srcSet="image-large.jpg" media="(min-width: 1024px)" />
//       <source srcSet="image-medium.jpg" media="(min-width: 768px)" />
//       <img src="image-small.jpg" alt="Responsive Image" />
//     </picture>
//   );
// };
