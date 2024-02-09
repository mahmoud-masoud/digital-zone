import { Link } from "react-router-dom";
import { auth } from "../../../Utils/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { LogOutIcon } from "lucide-react";

const AccountDropDown = ({ closeAccountDropDown }) => {
  const [user] = useAuthState(auth);

  const logout = () => {
    closeAccountDropDown();
    signOut(auth);
    window.location.reload();
  };

  return (
    <div>
      <div
        className="absolute right-0 top-full z-[100] flex w-72 -translate-x-1/4
           items-center justify-center rounded-b-xl border-2
          border-t-0 bg-white p-4 text-fontColor shadow-lg"
        onClick={closeAccountDropDown}
      >
        <div className="flex flex-col gap-3">
          {(user?.isAnonymous || !user) && (
            <Link
              to={"/signup"}
              className="mb-2 block rounded-full bg-primary px-4 py-1.5 text-sm
               font-medium text-white hover:bg-after"
            >
              Sign in or create account
            </Link>
          )}

          {user && !user.isAnonymous && (
            <Link to={"orders"} className="underline-offset-4 hover:underline">
              Orders
            </Link>
          )}

          {user?.uid == import.meta.env.VITE_ADMIN_ID && (
            <Link
              to={"admin"}
              onClick={closeAccountDropDown}
              className="underline-offset-4 hover:underline"
            >
              Dashboard
            </Link>
          )}

          {user && !user.isAnonymous && (
            <div
              className="flex cursor-pointer items-center gap-2 underline-offset-4 hover:underline"
              onClick={logout}
            >
              <span>Logout</span> <LogOutIcon size={17} />
            </div>
          )}
        </div>
      </div>
      <div
        className="fixed inset-0 z-10 h-screen w-screen bg-[#0006]"
        onClick={closeAccountDropDown}
      ></div>
    </div>
  );
};
export default AccountDropDown;
