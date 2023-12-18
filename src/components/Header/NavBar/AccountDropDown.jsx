import { Link } from "react-router-dom";
import { auth } from "../../../Utils/firebase";
import { signOut } from "firebase/auth";
import { createPortal } from "react-dom";
import { doc } from "firebase/firestore";
import Backdrop from "../../../UI/Backdrop";
import useAuthState from "../../../Hooks/firebase/useAuthState";

const AccountDropDown = ({
  accountDropdown,
  closeAccountDropDown,
  openAccountDropDown,
}) => {
  const { user, isLoading, isError } = useAuthState();

  return (
    <div className="">
      <div
        className="absolute right-0 top-full z-[100] flex w-72 -translate-x-1/4
           flex-col items-center justify-center rounded-b-xl border-2 border-t-0
          bg-white p-4 text-fontColor shadow-lg"
        onClick={closeAccountDropDown}
      >
        {auth.currentUser?.isAnonymous || auth.currentUser === null ? (
          <button className="mb-2">
            <Link
              to={"/signup"}
              className="rounded-full bg-primary px-4 py-1.5 text-sm
               font-medium text-white hover:bg-after"
            >
              Sign in or create account
            </Link>
          </button>
        ) : (
          <a
            href=""
            onClick={() => {
              closeAccountDropDown();
              signOut(auth);
            }}
          >
            Sign Out
          </a>
        )}
        {user?.uid == import.meta.env.VITE_ADMIN_ID && (
          <Link to={"admin"} onClick={closeAccountDropDown}>
            Admin
          </Link>
        )}
      </div>
      <div
        className="fixed inset-0 z-10 h-screen w-screen bg-[#0006]"
        onClick={closeAccountDropDown}
      ></div>
    </div>
  );
};
export default AccountDropDown;
