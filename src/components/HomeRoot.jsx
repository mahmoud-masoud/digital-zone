import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const HomeRoot = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default HomeRoot;
