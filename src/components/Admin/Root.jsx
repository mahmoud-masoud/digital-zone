import { Outlet } from 'react-router-dom';
import AdminNav from './NavbarPanel/NavbarPanel';
import TopBar from './TopBar';

const Root = () => {
  return (
    <>
      <TopBar />
      <div className='flex'>
        <AdminNav />
        <main className='pl-72 pt-16 flex-1 bg-gray-100 min-h-screen'>
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default Root;
