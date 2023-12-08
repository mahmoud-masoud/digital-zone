import { Outlet, ScrollRestoration } from "react-router-dom";
import NavbarPanel from "./NavbarPanel/NavbarPanel";
import TopBar from "./TopBar";
import NavbarTopBarWrapper from "./NavbarTopBarWrapper";

const Root = () => {
  return (
    <>
      <NavbarTopBarWrapper />
      <main className="min-h-screen flex-1 bg-gray-100 md:pl-64">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};
export default Root;
