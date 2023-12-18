import { FaPlus, FaMinus } from "react-icons/fa";
import LoadingSpinner from "../../../UI/LoadingSpinner";

import useCart from "../../../Hooks/useCartProduct";

import { useState } from "react";
import DropdownViewCart from "../../../UI/DropDownViewCart";
import { prodErrorMap } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
const AddToCartBtn = ({ title, price, id, image }) => {
  const [isAdded, setIsAdded] = useState(false);

  const {
    quantity,
    sendingProduct,
    productError,
    addToCart,
    removeFromCart,
    userLoading,
    userError,
  } = useCart({ title, price, id, image });

  const addProductToCart = () => {
    addToCart();
    setIsAdded(true);
  };

  const hideDropdown = () => {
    setIsAdded(false);
  };

  return (
    <>
      <AnimatePresence>
        {isAdded && !sendingProduct && !productError && (
          <DropdownViewCart
            title={title}
            price={price}
            image={image}
            hideDropdown={hideDropdown}
          />
        )}
      </AnimatePresence>
      <div
        className={`w-36 scale-90 bg-primary p-1 sm:scale-100 ${
          quantity === 0 && "hover:bg-after active:bg-after"
        }
    flex items-center justify-center rounded-full text-white transition`}
      >
        {quantity === 0 && !sendingProduct && (
          <button onClick={addProductToCart} className="p-1 font-medium">
            <span> {"Add to cart"} </span>
          </button>
        )}

        {sendingProduct && quantity === 0 && <LoadingSpinner />}

        {quantity > 0 && (
          <>
            <button
              className="rounded-full p-2 hover:bg-medium focus:bg-medium"
              onClick={removeFromCart}
            >
              <FaMinus />
            </button>
            <span className="flex-1 text-center font-medium">
              {quantity + " added"}
            </span>
            <button
              className="rounded-full p-2 hover:bg-medium focus:bg-medium"
              onClick={addToCart}
              autoFocus
            >
              <FaPlus />
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default AddToCartBtn;
