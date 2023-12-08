import OrdersTableColumns from "./OrdersTableColumns";
import useDocs from "../../../Hooks/useDocs";
import Table from "../Shared/Table";

const OrdersTable = () => {
  const { data, setData, isLoading, isError } = useDocs("orders");
  if (!data) return <p>Loading....</p>;

  return (
    <Table data={data} setData={setData} tableColumns={OrdersTableColumns} />
  );
};
export default OrdersTable;
