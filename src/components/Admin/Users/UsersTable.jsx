import useDocs from "../../../Hooks/useDocs";
import Loading from "../../../UI/Loading";
import Table from "../Shared/Table";
import usersColumns from "./usersTableColumns";

const UsersTable = () => {
  const { data, setData, isLoading, isError } = useDocs("users");

  if (isLoading) return <Loading />;
  if (isError) return <p>Something went wrong reload the page</p>;
  return <Table tableColumns={usersColumns} data={data} setData={setData} />;
};
export default UsersTable;
