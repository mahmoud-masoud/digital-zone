import { Link } from "react-router-dom";
import Category from "./Category";
import Wrapper from "../../UI/Wrapper";
const Categories = () => {
  return (
    <section className="mt-4 px-4 py-8 md:py-12">
      <Wrapper
        className={
          "grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-4 md:gap-20 "
        }
      >
        <Link to={"ct/laptops"}>
          <Category img={"/images/Categories/laptop.png"} title={"Laptops"} />
        </Link>

        <Link to={"ct/headphones"}>
          <Category
            img={"/images/Categories/headphone.jpg"}
            title={"Headphones"}
          />
        </Link>

        <Link to={"ct/mobile-phones"}>
          <Category
            img={"/images/Categories/phone.jpg"}
            title={"Mobile Phones"}
          />
        </Link>

        <Link to={"ct/smart-watches"}>
          <Category
            img={"/images/Categories/smart-watch.png"}
            title={"Smart Watches"}
          />
        </Link>
      </Wrapper>
    </section>
  );
};
export default Categories;
