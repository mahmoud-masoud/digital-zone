import Wrapper from "../../UI/Wrapper";
import OrdersTable from "../../components/Admin/Orders/OrdersTable";

const Orders = () => {
  return (
    <section className="px-4 py-6">
      <Wrapper>
        <h1 className="mb-6 text-xl font-bold text-fontColor">Orders</h1>
        <OrdersTable />
      </Wrapper>
    </section>
  );
};
export default Orders;
