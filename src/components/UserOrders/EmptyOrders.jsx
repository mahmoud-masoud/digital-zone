import { ShoppingBagIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import Wrapper from "../../UI/Wrapper";
const EmptyOrders = () => {
  return (
    <Wrapper>
      <div className="flex max-h-screen flex-col items-center justify-center  pt-20">
        <div className="flex ">
          <ShoppingBagIcon className="h-40 w-40 fill-after" />
          <FaceFrownIcon className="h-16 w-16 fill-primary/40" />
        </div>
        <p className="max-w-lg pt-10 text-center text-2xl font-semibold">
          There is no orders? Your cart is waiting for your first order!
        </p>
      </div>
    </Wrapper>
  );
};
export default EmptyOrders;
