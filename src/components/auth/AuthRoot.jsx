import { Outlet } from "react-router-dom";
import TopBar from "./Topbar";

const AuthRoot = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};
export default AuthRoot;
