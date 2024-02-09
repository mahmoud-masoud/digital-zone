import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Toast = ({ children, setToastVisibility }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      setToastVisibility(false);
    }, 7000);

    return () => clearTimeout(time);
  }, []);

  return createPortal(
    <div className="fixed bottom-10 left-1/2 z-[1000] -translate-x-1/2">
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0" }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.2, type: "tween" }}
        className=" rounded
     bg-emerald-500 p-2 font-medium text-white"
      >
        <div className="flex items-center justify-center gap-3">
          <p>{children}</p>
          <button type="button" onClick={() => setToastVisibility(false)}>
            <span className="cursor-pointer text-xl">&times;</span>
          </button>
        </div>
      </motion.div>
    </div>,
    document.getElementById("modal"),
  );
};
export default Toast;
