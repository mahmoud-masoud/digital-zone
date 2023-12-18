import { Link } from "react-router-dom";
import HomePageCard from "../../UI/HomePageCard";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/pagination";

const ProductsCarousel = ({ data }) => {
  return (
    <div className="flex items-center justify-center">
      <Swiper
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
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
            <HomePageCard
              title={product.title}
              img={product.images[0]}
              price={product.price}
              id={product.id}
            />
          </SwiperSlide>
        ))}

        <div className="hidden md:block">
          <button
            className="swiper-button-next next h-12 w-12 rounded-full 
              border border-black bg-white p-3 text-black transition after:text-sm active:scale-75"
          >
            <MdArrowForwardIos />
          </button>
          <button
            className="swiper-button-prev prev h-12 w-12 rounded-full 
              border border-black bg-white p-3 text-black transition after:text-sm active:scale-75"
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
