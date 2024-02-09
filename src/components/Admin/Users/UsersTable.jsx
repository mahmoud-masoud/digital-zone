import useDocs from "../../../Hooks/firebase/useDocs";
import PageSpinner from "../../../UI/PageSpinner";
import Table from "../Shared/Table";
import usersColumns from "./usersTableColumns";

const UsersTable = () => {
  const { data, isLoading, isError } = useDocs("users");

  if (isLoading) return <PageSpinner />;
  if (isError) return <p>Something went wrong reload the page</p>;

  return <Table tableColumns={usersColumns} data={data} />;
};
export default UsersTable;
