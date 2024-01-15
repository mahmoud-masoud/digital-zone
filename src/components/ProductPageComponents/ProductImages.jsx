import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./CarouselStyles.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductImages = ({ images, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="mb-8 flex h-[500px] gap-4">
      <div className="relative">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          direction="vertical"
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper max-h-full w-[100px]"
        >
          {images?.map((imgObj) => {
            return (
              <SwiperSlide
                key={imgObj}
                className="flex items-center justify-center rounded-md 
                border-2 border-gray-200 p-1"
              >
                <img
                  src={imgObj}
                  alt=""
                  loading="lazy"
                  className="max-h-full max-w-full"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          className={`prev absolute -top-0 right-1/2 z-10
          flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-light`}
        >
          <ChevronUp />
        </button>

        <button
          className={`next absolute -bottom-0 right-1/2 z-10 
        flex h-8 w-8 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-light`}
        >
          <ChevronDown />
        </button>
      </div>

      <Swiper
        spaceBetween={20}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Thumbs]}
        className="mySwiper2 max-w-[500px]"
      >
        {images?.map((imgObj) => {
          return (
            <SwiperSlide
              key={imgObj}
              className="flex items-center justify-center"
            >
              <img
                src={imgObj}
                alt=""
                loading="lazy"
                width={"auto"}
                height={500}
                className="max-h-full max-w-full"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default ProductImages;
