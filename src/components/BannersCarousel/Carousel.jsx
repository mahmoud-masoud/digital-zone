import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BannersCarousel.css";
import { Link } from "react-router-dom";

const images = [
  {
    url: "/images/Carousel/iPhone-15-pro.webp",
    smUrl: "/images/Carousel/small-images/iphone-15-pro-sm.webp",
    link: "ip/bb7d45b3-b941-47bb-9ef4-5bfdd8ccdfe7",
  },
  {
    url: "/images/Carousel/gaming.webp",
    smUrl: "/images/Carousel/small-images/gaming-sm.webp",
    link: "ct/gaming",
  },
  {
    url: "/images/Carousel/laptops.webp",
    smUrl: "/images/Carousel/small-images/laptops-sm.webp",
    link: "ct/laptops",
  },
];

const Carousel = () => {
  return (
    <div
      className="container relative mx-auto flex h-auto 
    items-center justify-center px-3 pt-6 sm:px-0 sm:pt-8"
    >
      <div className="overflow-hidden rounded-xl">
        <Swiper
          className="w-full"
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          pagination={{
            clickable: true,
            type: "bullets",
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Link to={image.link}>
                <picture>
                  <source
                    srcSet={image.smUrl}
                    type="image/webp"
                    media="(max-width: 770px)"
                    height="300"
                    width="800"
                  />
                  <img
                    src={image.url}
                    alt="Carousel banner image"
                    type="image/webp"
                    height="300"
                    width="1440"
                  />
                </picture>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default Carousel;

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
