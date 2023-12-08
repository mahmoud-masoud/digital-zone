import AddToFavoritesBtn from "./AddToFavoritesBtn";
import CardAddToCart from "./CardAddToCart";
import formatePrice from "../Utils/formatePrice";
const HomePageCard = ({ img, title, price, id }) => {
  const formattedPrice = formatePrice(price);

  return (
    <div className="max-w-40 relative flex flex-col justify-between rounded-lg">
      <AddToFavoritesBtn image={img} title={title} price={price} id={id} />
      <div className="relative mb-2 flex items-end">
        <div className="absolute bottom-0 translate-y-1/2 transform">
          <CardAddToCart image={img} title={title} price={price} id={id} />
        </div>
        <div className="flex aspect-square w-40 items-center justify-center">
          <img
            src={img}
            alt={title}
            loading="lazy"
            width="150"
            height="150"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
      <div className="mt-6">
        <span className="mb-2 block text-xl font-bold">{formattedPrice}</span>
        <p className="line-clamp-3">{title}</p>
      </div>
    </div>
  );
};
export default HomePageCard;
