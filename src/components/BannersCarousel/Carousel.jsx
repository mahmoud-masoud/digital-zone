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

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Carousel = () => {
  const images = [img1, img2, img3, img4];
  return (
    <div className='container relative mx-auto h-auto flex items-center justify-center overflow-hidden'>
      <Swiper
        className='bg-green-300 w-full'
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
        modules={[Navigation, Pagination, Autoplay]}
      >
        {images.map((image) => (
          <SwiperSlide key={image.toString()}>
            <img src={image} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className='prev absolute flex items-center justify-end -left-[75px]
       h-[100px] w-[100px] bg-white z-10 rounded-full text-3xl text-primary'
      >
        <FaAngleLeft />
      </button>
      <button
        className='next absolute flex items-center justify-start -right-[75px]
       h-[100px] w-[100px] bg-white z-10 rounded-full text-3xl text-primary'
      >
        <FaAngleRight />
      </button>
    </div>
  );
};
export default Carousel;
