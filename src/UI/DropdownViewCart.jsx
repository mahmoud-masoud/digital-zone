import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const DropdownViewCart = ({ hideDropdown, image, title, price }) => {
  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => hideDropdown()}
        className="fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-overlay"
      ></motion.div>

      <motion.dialog
        open
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-0  z-[1000] w-full max-w-[500px] rounded-b-xl
          bg-white p-4  pb-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex aspect-square h-20 w-20 items-center justify-center">
              <img
                src={image}
                alt="product image"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="font-medium">
              <p className="line-clamp-2 text-sm">{title}</p>
              <span className="text-emerald-600">Added to cart</span>
            </div>
            <span className="text-lg font-bold">${price}</span>
          </div>

          <div className="flex h-10 justify-between gap-8 text-sm">
            <button
              className="flex-1 rounded-md bg-primary px-4 py-2 font-semibold
            text-white transition hover:bg-after"
            >
              <Link to={"/cart"}>Checkout</Link>
            </button>
            <button
              onClick={() => hideDropdown()}
              className="flex-1 rounded-md border border-primary px-4 py-2
              text-fontColor transition hover:bg-light"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.dialog>
    </>,

    document.getElementById("modal"),
  );
};

export default DropdownViewCart;
