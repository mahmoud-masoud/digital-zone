import { motion } from "framer-motion";

const Backdrop = ({ closeModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[11] bg-black/40"
      onClick={closeModal}
    ></motion.div>
  );
};
export default Backdrop;
