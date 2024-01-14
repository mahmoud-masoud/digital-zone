import SubNavbar from "../../UI/SubNavbar";
import Wrapper from "../../UI/Wrapper";
import OrderDetails from "./OrderDetails";
import OrderSummery from "./OrderSummery";
const Checkout = () => {
  return (
    <>
      <SubNavbar />
      <Wrapper className="flex flex-col justify-center gap-10 p-2 pb-10 pt-6 md:flex-row">
        <OrderDetails />
        <OrderSummery />
      </Wrapper>
    </>
  );
};
export default Checkout;
