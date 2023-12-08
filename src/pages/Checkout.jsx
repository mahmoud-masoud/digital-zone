import SubNavbar from "../UI/SubNavbar";

import Wrapper from "../UI/Wrapper";
import OrderDetails from "../components/Checkout/OrderDetails";
import OrderSummery from "../components/Checkout/OrderSummery";
const Checkout = () => {
  return (
    <>
      <SubNavbar />
      <Wrapper className={"flex flex-col gap-10 pb-10 pt-6 md:flex-row "}>
        <OrderDetails />
        <OrderSummery />
      </Wrapper>
    </>
  );
};
export default Checkout;
