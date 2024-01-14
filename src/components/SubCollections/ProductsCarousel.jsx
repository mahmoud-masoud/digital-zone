import HomePageCard from "../../UI/HomePageCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, Turtle } from "lucide-react";

const ProductsCarousel = ({ data }) => {
  return (
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
          slidesPerGroup: 4,
        },
      }}
      spaceBetween={20}
      slidesPerView={2.5}
      slidesPerGroup={2}
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
              border border-black bg-white p-3 text-black transition
               after:text-sm active:scale-75"
        >
          <ChevronRight />
        </button>
        <button
          className="swiper-button-prev prev h-12 w-12 rounded-full 
              border border-black bg-white p-3 text-black
                transition after:text-sm active:scale-75"
        >
          <ChevronLeft />
        </button>
      </div>
    </Swiper>
  );
};
4;
export default ProductsCarousel;
