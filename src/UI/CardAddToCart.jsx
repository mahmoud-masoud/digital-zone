import { useEffect, useRef, useState } from "react";
import useCartProduct from "../Hooks/useCartProduct";
import LoadingSpinner from "./LoadingSpinner";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
const CardAddToCart = ({ title, price, id, image }) => {
  const [isClickOutside, setIsClickOutside] = useState(true);
  const {
    quantity,
    isProductAdding,
    addToCart,
    removeFromCart,
    userLoading,
    userError,
  } = useCartProduct({ title, price, id, image });
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (buttonRef.current && buttonRef.current.contains(e.target)) {
        setIsClickOutside(false);
      } else {
        setIsClickOutside(true);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div
      className={`main-btn w-fit scale-90 overflow-hidden bg-primary md:scale-100 ${
        quantity > 0 ? "gap-4 p-1" : "w-fit hover:bg-after active:bg-after"
      } flex items-center justify-between rounded-full text-white`}
      onClick={(e) => e.preventDefault()}
      ref={buttonRef}
    >
      <>
        <button
          className={`${
            (isClickOutside || quantity === 0) && "hidden"
          } rounded-full  p-1 hover:bg-medium focus:bg-medium`}
          onClick={removeFromCart}
        >
          <Minus />
        </button>
        <span
          className={`${
            quantity === 0 ? "hidden" : "h-8 w-8"
          } flex flex-1 items-center justify-center text-center font-medium`}
        >
          {quantity}
        </span>
        <button
          className={`${
            (isClickOutside || quantity === 0) && "hidden"
          } rounded-full  p-1 hover:bg-medium focus:bg-medium `}
          onClick={addToCart}
          autoFocus
        >
          <Plus />
        </button>
      </>

      <button
        onClick={addToCart}
        className={`${
          quantity === 0 && !isProductAdding ? "block" : "hidden"
        } px-5 py-2 font-medium `}
      >
        <span className="flex items-center gap-1">
          <Plus />
          Add
        </span>
      </button>

      {isProductAdding && quantity === 0 && (
        <div className="flex w-24 items-center justify-center py-1 ">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default CardAddToCart;
