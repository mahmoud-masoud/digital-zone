import { ShoppingBasket } from "lucide-react";
import Wrapper from "../../UI/Wrapper";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen">
      <Wrapper
        className={"flex flex-col items-center justify-center gap-10 pt-10"}
      >
        <ShoppingBasket size={250} strokeWidth={1.2} className="text-after" />
        <p className="text-center text-2xl font-semibold text-fontColor">
          Empty cart? Let's fix that – explore now!
        </p>
        <button
          onClick={() => navigate("/")}
          className="rounded-md bg-primary p-2 px-6 font-semibold text-white
         duration-150 hover:bg-after"
        >
          Go to Home
        </button>
      </Wrapper>
    </section>
  );
};
export default EmptyCart;
