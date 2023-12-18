import OrdersTableColumns from "./OrdersTableColumns";
import useDocs from "../../../Hooks/useDocs";
import Table from "../Shared/Table";
import Loading from "../../../UI/Loading";

const OrdersTable = () => {
  const { data, setData, isLoading, isError } = useDocs("orders");
  if (!data) return <Loading />;

  return (
    <Table data={data} setData={setData} tableColumns={OrdersTableColumns} />
  );
};
export default OrdersTable;
