import { TruckIcon } from "@heroicons/react/24/solid";
import { RotateCcw, Zap } from "lucide-react";
import AddToCartBtn from "./AddToCartBtn";
import AddToFavoritesBtn from "../../SubCollections/AddToFavoritesBtn";
import { useParams } from "react-router-dom";
import formatePrice from "../../../Utils/formatePrice";
const ProductInfo = ({ title, price, id, image, quantity }) => {
  const productID = useParams().productId;

  const formattedPrice = formatePrice(price);

  return (
    <div
      className="top-24 mb-4 w-full self-start bg-white md:sticky md:w-1/3 
    md:rounded-lg md:p-4 md:shadow-card-shadow"
    >
      <div className="mb-2 flex justify-end">
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
       items-center justify-between bg-white p-4 shadow-card-shadow
        md:static md:block md:p-0 md:py-4 md:shadow-[0] "
      >
        <span className="mb-2 block text-xl font-bold">{`${formattedPrice}`}</span>
        <AddToCartBtn title={title} price={price} id={id} image={image} />
      </div>

      <div className="flex flex-col gap-4 py-4 max-md:border-b">
        <div className="shipping flex items-center gap-3 text-gray-700 ">
          <TruckIcon className="w-5" />
          <p className="text-sm">
            Free shipping arrives by
            <span className="font-semibold"> Tomorrow</span>
          </p>
        </div>

        <div className="Sold flex items-center gap-3 text-gray-700 ">
          <Zap size={20} />
          <p className="text-sm">Sold and shipped by Digitalzone.com</p>
        </div>

        <div className="returning flex items-center gap-3 text-gray-700 ">
          <RotateCcw
            className="rounded-full bg-primary p-1 text-white"
            size={24}
          />
          <p className="text-sm">Free 14-day returns</p>
        </div>
      </div>
    </div>
  );
};
export default ProductInfo;
