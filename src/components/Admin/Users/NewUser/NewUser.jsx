import Wrapper from "../../../../UI/Wrapper";
import NewUserForm from "./NewUserForm";

const NewUser = () => {
  return (
    <section className="p-4 md:p-6">
      <Wrapper>
        <h1 className="text-xl font-medium">New User</h1>
        <NewUserForm />
      </Wrapper>
    </section>
  );
};
export default NewUser;
