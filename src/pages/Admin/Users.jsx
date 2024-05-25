import { Link } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import UsersTable from "../../components/Admin/Users/UsersTable";
const Users = () => {
  return (
    <section className="p-4 md:p-6">
      <Wrapper>
        <div className="mb-4 flex justify-between md:mb-6">
          <h1 className="text-xl font-bold text-fontColor">Users</h1>
          <Link to="new">
            <div
              className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium
          text-white transition
           hover:bg-gray-700"
            >
              <span>Add User</span>
            </div>
          </Link>
        </div>
        <UsersTable />
      </Wrapper>
    </section>
  );
};
export default Users;
