import { FaReact, FaArrowRotateLeft } from "react-icons/fa6";
import HeartIcon from "../../../UI/HeartIcon";
import { FaShippingFast } from "react-icons/fa";
import AddToCartBtn from "./AddToCartBtn";
import ProductColors from "./ProductColors";

import AddToFavoritesBtn from "../../../UI/AddToFavoritesBtn";
import { useParams } from "react-router-dom";

const ProductInfo = ({ title, price, id, image, quantity }) => {
  const productID = useParams().productId;

  return (
    <div
      className="top-24 mb-4 w-full self-start bg-white md:sticky md:w-auto 
    md:rounded-lg md:p-4 md:shadow-card-shadow xl:w-[30%]"
    >
      <div className="mb-6 flex justify-end">
        <AddToFavoritesBtn
          id={productID}
          price={price}
          title={title}
          image={image}
          fetchedQuantity={quantity}
        />
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
      <div
        className="md:bb-2 fixed bottom-0 right-0 flex w-full
       items-center justify-between bg-white p-4 shadow-card-shadow md:static md:block md:p-0 md:py-4 md:shadow-[0] "
      >
        <span className="mb-2 block text-xl font-bold">{`$${price}`}</span>
        <AddToCartBtn title={title} price={price} id={id} image={image} />
      </div>
      <ProductColors />

      <div className="flex flex-col gap-4 pb-4">
        <div className="shipping flex items-center gap-3 text-gray-700 ">
          <FaShippingFast />
          <p className="text-sm">
            Free shipping arrives by
            <span className="font-semibold"> Tomorrow</span>
          </p>
        </div>

        <div className="Sold flex items-center gap-3 text-gray-700 ">
          <FaReact />
          <p className="text-sm">Sold and shipped by React.com</p>
        </div>

        <div className="returning flex items-center gap-3 text-gray-700 ">
          <FaArrowRotateLeft className="h-5 w-5 rounded-full bg-primary p-1 text-white" />
          <p className="text-sm">Free 14-day returns</p>
        </div>
      </div>
    </div>
  );
};
export default ProductInfo;
