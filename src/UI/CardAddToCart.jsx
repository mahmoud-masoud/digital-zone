import { FaPlus, FaMinus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import useCartProduct from "../Hooks/useCartProduct";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";
const CardAddToCart = ({ title, price, id, image }) => {
  const [isClickOutside, setIsClickOutside] = useState(true);
  const {
    quantity,
    sendingProduct,
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
    <motion.div
      className={`main-btn scale-90 overflow-hidden bg-primary md:scale-100 ${
        quantity > 0 ? "gap-6 p-1" : "w-fit hover:bg-after active:bg-after"
      } flex items-center justify-between rounded-full text-white`}
      onClick={(e) => e.preventDefault()}
      ref={buttonRef}
    >
      <>
        <button
          className={`${
            (isClickOutside || quantity === 0) && "hidden"
          } rounded-full  p-2 hover:bg-medium focus:bg-medium`}
          onClick={removeFromCart}
        >
          <FaMinus />
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
          } rounded-full  p-2 hover:bg-medium focus:bg-medium `}
          onClick={addToCart}
          autoFocus
        >
          <FaPlus />
        </button>
      </>

      <button
        onClick={addToCart}
        className={`${
          quantity === 0 && !sendingProduct ? "block" : "hidden"
        } px-5 py-2 font-medium `}
      >
        <div className="flex items-center gap-1">
          <FaPlus className="text-sm" />
          <span>Add</span>
        </div>
      </button>

      {sendingProduct && quantity === 0 && (
        <div className="flex w-24 items-center justify-center py-1 ">
          <LoadingSpinner />
        </div>
      )}
    </motion.div>
  );
};

export default CardAddToCart;
