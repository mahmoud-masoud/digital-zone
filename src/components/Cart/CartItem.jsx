import { FaArrowRotateLeft, FaMinus, FaPlus } from "react-icons/fa6";

import { Link } from "react-router-dom";
import useCartProduct from "../../Hooks/useCartProduct";
import formatePrice from "../../Utils/formatePrice";

const CartItem = ({ title, price, totalPrice, image, id }) => {
  const {
    quantity,
    sendingProduct,
    addToCart,
    removeFromCart,
    removeProductPermanently,
    userLoading,
    userError,
  } = useCartProduct({ title, price, id, image });

  const formattedPrice = formatePrice(totalPrice);

  return (
    <>
      <Link to={`/ip/${id}`}>
        <div className="mb-6 flex gap-4">
          <div className="img-box flex h-24 w-24 shrink-0 items-center justify-center">
            <img src={image} alt={title} className="max-h-full max-w-full" />
          </div>

          <div className="item-name">
            <h3 className="mb-2 line-clamp-2 text-sm md:line-clamp-none">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <FaArrowRotateLeft className=" h-5 w-5 rounded-full bg-primary p-1 text-white" />
              <span className="text-sm">Free 30-day returns</span>
            </div>
          </div>

          <div className="item-price ml-auto">
            <span className="text-lg font-bold">{formattedPrice}</span>
          </div>
        </div>
      </Link>

      <div className="cart-item-actions flex justify-between gap-4 md:justify-end  md:gap-10">
        <button
          onClick={removeProductPermanently}
          className="text-sm underline"
        >
          Remove
        </button>
        <button className="underline">Save for later</button>

        <div
          className="add-remove flex w-28 items-center
        justify-between rounded-full border-[1px] border-gray-400 p-1 text-sm"
        >
          <button
            onClick={addToCart}
            className="flex h-6 w-6 items-center justify-center
           rounded-full p-0.5 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white"
          >
            <FaPlus />
          </button>
          <span className="inline-block font-bold">{quantity}</span>
          <button
            onClick={removeFromCart}
            className="flex h-6 w-6 items-center justify-center
           rounded-full p-0.5 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white"
          >
            <FaMinus />
          </button>
        </div>
      </div>
    </>
  );
};
export default CartItem;
