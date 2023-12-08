import useDocs from "../../../Hooks/useDocs";
import Table from "../Shared/Table";
import usersColumns from "./usersTableColumns";

const UsersTable = () => {
  const { data, setData, isLoading, isError } = useDocs("users");

  if (!data) return <p>Loading....</p>;
  console.log(data);
  return <Table tableColumns={usersColumns} data={data} setData={setData} />;
};
export default UsersTable;
