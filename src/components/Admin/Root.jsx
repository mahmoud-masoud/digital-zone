import { Outlet, useNavigate } from "react-router-dom";
import NavbarTopBarWrapper from "./NavbarTopBarWrapper";
import PageSpinner from "../.../../../UI/PageSpinner";
import useUserAuthContext from "../../Hooks/firebase/useUserAuthContext";

const Root = () => {
  const navigate = useNavigate();

  const { user, isAdmin, userIsLoading, userDataIsLoading } =
    useUserAuthContext();

  if (userIsLoading || userDataIsLoading) return <PageSpinner />;

  if (!user || !isAdmin) {
    navigate("/");
  }

  return (
    <>
      <NavbarTopBarWrapper />
      <main className="min-h-screen flex-1 bg-gray-100 md:pl-64">
        <Outlet />
      </main>
    </>
  );
};
export default Root;
