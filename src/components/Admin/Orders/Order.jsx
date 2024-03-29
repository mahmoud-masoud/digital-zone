import { useParams } from "react-router-dom";
import useDoc from "../../../Hooks/firebase/useDoc";
import Wrapper from "../../../UI/Wrapper";
import OrderDetails from "./OrderDetails";
import UserInfo from "./UserInfo";
import TopBox from "./TopBox";
import PageSpinner from "../../../UI/PageSpinner";

const Order = () => {
  const orderId = useParams().orderId;

  const { data, isLoading, isError } = useDoc(orderId);

  return (
    <section className="min-h-screen bg-gray-100">
      {isLoading ? (
        <PageSpinner />
      ) : (
        <Wrapper className="px-4 py-8">
          <TopBox orderId={data.id} orderTimestamp={data.timestamp} />
          <div className="flex flex-col gap-6 lg:flex-row">
            <OrderDetails data={data} />
            <UserInfo shippingInfo={data?.shippingInfo} />
          </div>
        </Wrapper>
      )}
    </section>
  );
};
export default Order;
