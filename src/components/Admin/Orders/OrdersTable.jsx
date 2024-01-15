import OrdersTableColumns from "./OrdersTableColumns";
import useDocs from "../../../Hooks/useDocs";
import Table from "../Shared/Table";
import MainSpinner from "../../../UI/MainSpinner";

const OrdersTable = () => {
  const { data, setData, isLoading, isError } = useDocs("orders");
  if (!data) return <MainSpinner />;

  return (
    <Table data={data} setData={setData} tableColumns={OrdersTableColumns} />
  );
};
export default OrdersTable;
