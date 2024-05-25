import AddToCartBtn from "../ProductPageComponents/ProductBuyBox/AddToCartBtn";
import { Link } from "react-router-dom";
import { removeProductFromFavorites } from "../../Utils/firebase-functions";
import { useAuthState } from "react-firebase-hooks/auth";
import formatePrice from "../../Utils/formatePrice";
import { auth } from "../../Utils/firebaseConfig";

const FavItem = ({ title, image, price, id }) => {
  const [user] = useAuthState(auth);

  const removeItem = () => {
    removeProductFromFavorites(user.uid, id);
  };

  const formattedPrice = formatePrice(price);

  return (
    <>
      <Link to={`/ip/${id}`}>
        <div className="mb-4 flex justify-between gap-2 ">
          <div className="flex justify-between gap-4 md:gap-6 lg:gap-10">
            <div className="flex aspect-square h-24 w-24 flex-shrink-0 items-center justify-center">
              <img
                src={image}
                alt={title}
                width="150"
                height="150"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <p className="line-clamp-2 max-sm:text-sm">{title}</p>
            </div>
            <div>
              <span className="font-bold sm:text-lg">{formattedPrice}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <button
            className="underline hover:text-primary hover:no-underline"
            onClick={removeItem}
          >
            Remove
          </button>
        </div>
        <AddToCartBtn title={title} id={id} image={image} price={price} />
      </div>
    </>
  );
};
export default FavItem;
