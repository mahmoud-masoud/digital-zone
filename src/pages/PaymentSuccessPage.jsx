import Wrapper from "../UI/Wrapper";
import Lottie from "lottie-react";
import success from "../Assets/Lottie/success.json";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Wrapper
      className={
        "flex flex-col items-center justify-center p-4 pt-20 text-center"
      }
    >
      <div className="w-80">
        <Lottie animationData={success} />
      </div>

      <motion.h1
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="pt-10 text-xl font-bold text-after"
      >
        Payment Success! Thanks for choosing us.
      </motion.h1>
      <motion.button
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        onClick={() => navigate("/")}
        className="mt-8 rounded-lg  bg-blue-500 px-6 py-2
       text-lg font-bold text-white duration-150 hover:bg-blue-600"
      >
        Back to home
      </motion.button>
    </Wrapper>
  );
};
export default PaymentSuccessPage;
