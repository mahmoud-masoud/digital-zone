import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header/Header';

const Root = () => {
  return (
    <div id='layout'>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};
export default Root;
