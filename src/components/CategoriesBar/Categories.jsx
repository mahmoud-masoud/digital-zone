import { Link } from "react-router-dom";
import Category from "./Category";
import Wrapper from "../../UI/Wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

const categoriesUrls = [
  {
    url: "laptops",
    imgUrl: "images/Categories/laptop.webp",
    name: "Laptops",
  },
  {
    url: "headphones",
    imgUrl: "images/Categories/headphone.webp",
    name: "Headphones",
  },
  {
    url: "mobile-phones",
    imgUrl: "images/Categories/phone.webp",
    name: "Smart Phones",
  },
  {
    url: "smart-watches",
    imgUrl: "images/Categories/smart-watch.webp",
    name: "Smart Watches",
  },
  {
    url: "gaming",
    imgUrl: "images/Categories/gaming.webp",
    name: "Gaming",
  },
  {
    url: "monitors",
    imgUrl: "images/Categories/monitor.webp",
    name: "Monitors",
  },
  {
    url: "tablets",
    imgUrl: "images/Categories/tablet.webp",
    name: "Tablets",
  },
];

const Categories = () => {
  return (
    <section className="mt-4 px-4 py-8 md:py-12">
      <Wrapper>
        <h3 className="mb-8 font-semibold text-fontColor md:text-xl">
          Shop by category
        </h3>
        <Swiper
          freeMode={true}
          breakpoints={{
            768: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5.5,
              spaceBetween: 30,
            },
          }}
          spaceBetween={20}
          slidesPerView={2.7}
          modules={[FreeMode]}
        >
          {categoriesUrls.map((category) => (
            <SwiperSlide key={category.url}>
              <Link
                to={`ct/${category.url}`}
                className="flex items-center justify-center"
              >
                <Category img={category.imgUrl} title={category.name} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
    </section>
  );
};
export default Categories;
