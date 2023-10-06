import Wrapper from '../UI/Wrapper';
import NewProductForm from '../components/Admin/AddNewProduct/NewProductForm';
import AdminNavbar from '../components/Admin/AdminNavbar';

const Admin = () => {
  return (
    <>
      <AdminNavbar />
      <Wrapper className={'flex justify-center items-center p-4'}>
        <NewProductForm />
      </Wrapper>
    </>
  );
};
export default Admin;
