import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import NavbarPanel from "./NavbarPanel/NavbarPanel";
import TopBar from "./TopBar";
import NavbarTopBarWrapper from "./NavbarTopBarWrapper";
import { useNavbar } from "@nextui-org/react";
import useAuthState from "../../Hooks/firebase/useAuthState";
import { useEffect } from "react";
const Root = () => {
  const { user, isLoading, isError } = useAuthState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.uid != import.meta.env.VITE_ADMIN_ID) navigate("/");
    }
  }, [user, isLoading]);

  if (isLoading) return;
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
