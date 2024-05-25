import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../Utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import MobileAccountAvatar from "./MobileAccountAvatar";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { LogOutIcon } from "lucide-react";
import useUserAuthContext from "../../../Hooks/firebase/useUserAuthContext";
const MobileNavbar = ({ closeNavbar }) => {
  const { user, isAdmin, userIsLoading } = useUserAuthContext();
  const [accordion, setAccordion] = useState(false);

  const handleAccordionBlur = () => {
    setTimeout(() => {
      setAccordion(false);
    }, 100);
  };

  const logout = () => {
    closeNavbar();
    signOut(auth);
    window.location.reload();
  };

  return (
    <nav className="fixed bottom-0 left-0 top-0 z-10 h-screen w-screen sm:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 w-full bg-black/40"
        onClick={closeNavbar}
      ></motion.div>

      <motion.div
        className="border-3 absolute left-0 flex h-full w-[320px] flex-col border-r
         bg-white px-4 py-20 "
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ type: "just", duration: 0.2 }}
      >
        <button
          role="overlay"
          className="absolute left-[270px] top-14 text-4xl"
          onClick={closeNavbar}
        >
          &times;
        </button>
        <MobileAccountAvatar />
        <ul className="flex-col">
          <li className="text-xl">
            <button
              className=" group w-full"
              onClick={() => {
                setAccordion(!accordion);
              }}
              onBlur={handleAccordionBlur}
            >
              <div className="flex items-center gap-1 py-4">
                <p>Categories</p>
                <ChevronDownIcon
                  className="w-6 transition
                 duration-300 group-focus:rotate-180"
                />
              </div>
            </button>
            <ul
              className={`h-0 overflow-hidden pl-3 text-lg ${
                accordion && "mb-2 h-[262px]"
              } transition-all duration-300`}
            >
              <li>
                <Link
                  to={"ct/mobile-phones"}
                  className="block w-full border-b border-[#f1f1f1] pb-2 hover:text-after
                 hover:underline"
                  onClick={closeNavbar}
                >
                  Mobile Phones
                </Link>
              </li>

              <li>
                <Link
                  to={"ct/headphones"}
                  className="block w-full border-b border-[#f1f1f1]
                 py-2 hover:text-after hover:underline"
                  onClick={closeNavbar}
                >
                  Headphones
                </Link>
              </li>

              <li>
                <Link
                  to={"ct/smart-watches"}
                  className="block w-full border-b border-[#f1f1f1]
                 py-2 hover:text-after hover:underline"
                  onClick={closeNavbar}
                >
                  Smart Watches
                </Link>
              </li>

              <li>
                <Link
                  to={"ct/laptops"}
                  className="block w-full border-b border-[#f1f1f1] py-2
                 hover:text-after hover:underline"
                  onClick={closeNavbar}
                >
                  Laptops
                </Link>
              </li>

              <li>
                <Link
                  to={"ct/monitors"}
                  className="block w-full border-b border-[#f1f1f1] py-2
                 hover:text-after hover:underline"
                  onClick={closeNavbar}
                >
                  Monitors
                </Link>
              </li>
              <li>
                <Link
                  to={"ct/tablets"}
                  className="block w-full border-b border-[#f1f1f1] py-2
                 hover:text-after hover:underline"
                  onClick={closeNavbar}
                >
                  Tablets
                </Link>
              </li>
            </ul>
          </li>

          <li className="flex items-center gap-1 py-4 text-xl">
            <Link to={"favorites"} onClick={closeNavbar}>
              Favorites
            </Link>
          </li>
          <li className="flex items-center gap-1 py-4 text-xl">
            <Link to={"orders"} onClick={closeNavbar}>
              Orders
            </Link>
          </li>
          {user && !user.isAnonymous && !userIsLoading && (
            <li className="flex items-center gap-1 py-4 text-xl">
              <Link to={"profile"} onClick={closeNavbar}>
                Profile
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="flex items-center gap-1 py-4 text-xl">
              <Link to={"/admin"} onClick={closeNavbar}>
                Admin Dashboard
              </Link>
            </li>
          )}

          {user && !user.isAnonymous && (
            <li className="mt-20 hover:text-primary">
              <div onClick={logout} className="w-fit">
                <div className=" flex items-center gap-2">
                  <span>Logout</span> <LogOutIcon size={20} />
                </div>
              </div>
            </li>
          )}
        </ul>
      </motion.div>
    </nav>
  );
};
export default MobileNavbar;
