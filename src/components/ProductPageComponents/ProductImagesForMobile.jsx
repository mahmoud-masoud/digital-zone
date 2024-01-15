import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper/modules";

const ProductImagesForMobile = ({ images }) => {
  return (
    <div className="pt-8">
      <Swiper
        scrollbar={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        modules={[Scrollbar, Autoplay]}
        className="h-full max-w-full"
      >
        {images.map((imgSrc) => (
          <SwiperSlide key={imgSrc}>
            <div className="flex aspect-square items-center justify-center">
              <img
                src={imgSrc}
                alt=""
                height="366"
                width="366"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ProductImagesForMobile;
