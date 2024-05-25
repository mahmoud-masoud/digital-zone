import AddToFavoritesBtn from "./AddToFavoritesBtn";
import CardAddToCart from "./CardAddToCart";
import formatePrice from "../../../Utils/formatePrice";
import { Link } from "react-router-dom";
const HomePageCard = ({ img, title, price, id }) => {
  const formattedPrice = formatePrice(price);

  return (
    <div className="relative flex flex-col justify-between rounded-lg">
      <AddToFavoritesBtn image={img} title={title} price={price} id={id} />
      <div className="relative mb-2 flex items-end">
        <div className="absolute bottom-0 z-10 translate-y-1/2 transform">
          <CardAddToCart image={img} title={title} price={price} id={id} />
        </div>
        <div className="flex aspect-square h-28 w-28 items-center justify-center md:h-36 md:w-36">
          <img
            src={img}
            alt={title}
            loading="lazy"
            width="144"
            height="144"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
      <div className="mt-6">
        <span className="mb-2 block text-xl font-bold">{formattedPrice}</span>
        <p className="line-clamp-3">{title}</p>
      </div>
      <Link to={`ip/${id}`} className="absolute inset-0"></Link>
    </div>
  );
};
export default HomePageCard;
