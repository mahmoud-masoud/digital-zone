import { motion } from "framer-motion";
import useCart from "../../Hooks/firebase/useCart";
import Wrapper from "../../UI/Wrapper";
import CartCheckout from "./CartCheckout";
import CartItems from "./CartItems";

const Cart = () => {
  const { items, isLoading, error } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper className="flex flex-col gap-8 p-4 py-10 sm:py-5 md:flex-row">
        <CartItems cartItems={items} />
        <CartCheckout cartItems={items} />
      </Wrapper>
    </motion.div>
  );
};
export default Cart;
