import AddToFavoritesBtn from "../SubCollections/UI/AddToFavoritesBtn";
import CardAddToCart from "../SubCollections/UI/CardAddToCart";
import formatePrice from "../../Utils/formatePrice";
import { Link } from "react-router-dom";
const ProductCard = ({ img, title, price, id }) => {
  const formattedPrice = formatePrice(price);

  return (
    <div className="relative flex flex-col justify-between rounded-lg">
      <AddToFavoritesBtn image={img} title={title} price={price} id={id} />
      <div className="relative mb-2 flex items-end">
        <div className="absolute bottom-0 z-10 translate-y-1/2 transform">
          <CardAddToCart image={img} title={title} price={price} id={id} />
        </div>
        <div className="flex aspect-square h-36 w-36 items-center justify-center">
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
export default ProductCard;
