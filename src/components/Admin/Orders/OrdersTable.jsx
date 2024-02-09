import ordersTableColumns from "./OrdersTableColumns";
import useDocs from "../../../Hooks/firebase/useDocs";
import PageSpinner from "../../../UI/PageSpinner";
import Table from "../Shared/Table";

const OrdersTable = () => {
  const { data, isLoading, isError } = useDocs("orders");

  if (isLoading) return <PageSpinner />;
  if (isError) return <p>Something went wrong</p>;
  return <Table tableColumns={ordersTableColumns} data={data} />;
};
export default OrdersTable;
