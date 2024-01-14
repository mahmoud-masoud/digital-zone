import { Link } from "react-router-dom";
import Category from "./Category";
import Wrapper from "../../UI/Wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

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
          <SwiperSlide>
            <Link
              to={"ct/laptops"}
              className="flex items-center justify-center"
            >
              <Category
                img={"/images/Categories/laptop.webp"}
                title={"Laptops"}
              />
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link
              to={"ct/headphones"}
              className="flex items-center justify-center"
            >
              <Category
                img={"/images/Categories/headphone.webp"}
                title={"Headphones"}
              />
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link
              to={"ct/mobile-phones"}
              className="flex items-center justify-center"
            >
              <Category
                img={"/images/Categories/phone.webp"}
                title={"Mobile Phones"}
              />
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link
              to={"ct/smart-watches"}
              className="flex items-center justify-center"
            >
              <Category
                img={"/images/Categories/smart-watch.webp"}
                title={"Smart Watches"}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={"ct/gaming"} className="flex items-center justify-center">
              <Category
                img={"/images/Categories/gaming.webp"}
                title={"Gaming"}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to={"ct/monitors"}
              className="flex items-center justify-center"
            >
              <Category
                img={"/images/Categories/monitor.webp"}
                title={"Monitors"}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to={"ct/tablets"}
              className="flex items-center justify-center"
            >
              <Category
                img={"/images/Categories/tablets.webp"}
                title={"Tablets"}
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </Wrapper>
    </section>
  );
};
export default Categories;
