import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ToolTip = ({ children, setTooltipVisibility }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      setTooltipVisibility(false);
    }, 7000);

    return () => clearTimeout(time);
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.2, type: "tween" }}
      className="fixed bottom-10 right-1/2 translate-x-1/2 rounded
     bg-emerald-500 p-2 font-medium text-white"
    >
      <div className="flex items-center gap-3">
        <p>{children}</p>
        <button type="button" onClick={() => setTooltipVisibility(false)}>
          <span className="cursor-pointer text-xl">&times;</span>
        </button>
      </div>
    </motion.div>,
    document.getElementById("modal"),
  );
};
export default ToolTip;
