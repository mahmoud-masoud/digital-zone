import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header/Header';

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
export default Root;
