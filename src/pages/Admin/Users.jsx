import Wrapper from "../../UI/Wrapper";
import UsersTable from "../../components/Admin/Users/UsersTable";
const Users = () => {
  return (
    <section className="px-4 py-6">
      <Wrapper>
        <UsersTable />
      </Wrapper>
    </section>
  );
};
export default Users;
