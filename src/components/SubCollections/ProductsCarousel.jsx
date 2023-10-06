import { Link } from 'react-router-dom';
import HomePageCard from '../../UI/HomePageCard';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/pagination';

const ProductsCarousel = ({ data }) => {
  console.log(data);

  return (
    <div className='flex justify-center items-center'>
      <Swiper
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
        breakpoints={{
          768: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        spaceBetween={20}
        slidesPerView={2.5}
        modules={[Navigation]}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <Link to={`ip/${product.id}`}>
              <HomePageCard
                title={product.title}
                img={product.images[0]}
                price={product.price}
                id={product.id}
              />
            </Link>
          </SwiperSlide>
        ))}

        <div className='hidden md:block'>
          <button
            className='swiper-button-next after:text-sm next bg-white border 
              border-black h-12 w-12 rounded-full text-black p-3 active:scale-75 transition'
          >
            <MdArrowForwardIos />
          </button>
          <button
            className='swiper-button-prev after:text-sm prev bg-white border 
              border-black h-12 w-12 rounded-full text-black p-3 active:scale-75 transition'
          >
            <MdArrowBackIosNew />
          </button>
        </div>
      </Swiper>
    </div>
  );
};
4;
export default ProductsCarousel;
