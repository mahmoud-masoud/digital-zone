import { useState } from "react";
import Backdrop from "./Backdrop";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPopup = ({ closePopup }) => {
  const navigate = useNavigate();

  const onClickHandler = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClickHandler}
    >
      <Backdrop closeModal={closePopup} />

      <div className="w-full p-2 sm:w-[500px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: "250%", scale: 0.9 }}
          className="relative z-[102] 
         rounded-lg bg-white p-5 "
        >
          <div>
            <p className="pb-8 text-lg font-semibold sm:text-2xl">
              Sign in or create your account
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="w-full rounded-md bg-primary p-2 px-6
               font-semibold text-white duration-150 hover:bg-after"
              >
                Sign up
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="w-full rounded-md border border-gray-400 px-6
               py-2 font-semibold duration-150 hover:bg-light"
              >
                Sign in
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};
export default LoginPopup;
