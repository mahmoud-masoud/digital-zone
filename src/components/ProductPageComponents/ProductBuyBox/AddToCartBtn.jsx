import LightSpinner from "../../../UI/LightSpinner";
import useCartProduct from "../../../Hooks/firebase/useCartProduct";
import { useState } from "react";
import DropdownViewCart from "../../../UI/DropDownViewCart";
import { AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
const AddToCartBtn = ({ title, price, id, image }) => {
  const [isAdded, setIsAdded] = useState(false);

  const {
    quantity,
    isProductAdding,
    productError,
    addToCart,
    removeFromCart,
    userLoading,
    userError,
  } = useCartProduct({ title, price, id, image });

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
        {isAdded && !isProductAdding && !productError && (
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
        {quantity === 0 && !isProductAdding && (
          <button onClick={addProductToCart} className="p-1 font-medium">
            <span> {"Add to cart"} </span>
          </button>
        )}

        {isProductAdding && quantity === 0 && <LightSpinner />}

        {quantity > 0 && (
          <>
            <button
              className="rounded-full p-1.5 hover:bg-medium focus:bg-medium"
              onClick={removeFromCart}
            >
              <Minus size={20} strokeWidth={3} />
            </button>
            <span className="flex-1 text-center font-medium">
              {quantity + " added"}
            </span>
            <button
              className="rounded-full p-1.5 hover:bg-medium focus:bg-medium"
              onClick={addToCart}
              autoFocus
            > 
              <Plus size={20} strokeWidth={3} />
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default AddToCartBtn;
