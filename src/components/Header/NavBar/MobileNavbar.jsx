import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import MobileAccountAvatar from "./MobileAccountAvatar";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../../../Utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AnimatePresence, motion } from "framer-motion";
const MobileNavbar = ({ closeNavbar, navbarIsOpen }) => {
  const [accordion, setAccordion] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-100%" },
  };
  const handleAccordionBlur = () => {
    setTimeout(() => {
      setAccordion(false);
    }, 100);
  };
  return (
    <motion.nav
      initial="hidden"
      animate={navbarIsOpen ? "visible" : "hidden"}
      variants={variants}
      className="absolute left-0 top-0 h-screen w-screen md:hidden"
    >
      <button
        className="absolute bottom-0 left-0 right-0 top-0 w-full bg-transparent"
        onClick={closeNavbar}
      ></button>
      <button
        className="absolute left-[270px] top-14 z-10 text-3xl"
        onClick={closeNavbar}
      >
        <IoCloseSharp />
      </button>

      {
        <ul
          className="border-3 absolute left-0 flex h-full w-[320px] flex-col 
      border-r bg-white px-4 py-20"
        >
          <MobileAccountAvatar />

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
                <FaAngleDown className="text-sm transition duration-300 group-focus:rotate-180" />
              </div>
            </button>
            <div
              className={`h-0 overflow-hidden pl-3 text-lg ${
                accordion && "mb-2 h-[180px]"
              } transition-all duration-300`}
            >
              <Link
                to={"mobile-phones"}
                className="block w-full border-b border-[#f1f1f1] pb-2 hover:text-after hover:underline"
                onClick={closeNavbar}
              >
                Mobile Phones
              </Link>

              <Link
                to={"headphones"}
                className="block w-full border-b border-[#f1f1f1] py-2
                 hover:text-after hover:underline"
                onClick={closeNavbar}
              >
                Headphones
              </Link>

              <Link
                to={"smart-watches"}
                className="block w-full border-b border-[#f1f1f1] py-2
                 hover:text-after hover:underline"
                onClick={closeNavbar}
              >
                Smart Watches
              </Link>

              <Link
                to={"laptops"}
                className="block w-full border-b border-[#f1f1f1] py-2
                 hover:text-after hover:underline"
                onClick={closeNavbar}
              >
                Laptops
              </Link>
            </div>
          </li>

          <li className="py-4 text-xl" onClick={closeNavbar}>
            <Link to={"deals"}>Deals</Link>
          </li>
          <li className="py-4 text-xl" onClick={closeNavbar}>
            <Link to={"contact"}>Contact</Link>
          </li>
          <li
            className="flex items-center gap-1 py-4 text-xl"
            onClick={closeNavbar}
          >
            <Link to={"favorites"}>Favorites</Link>
          </li>
          <li
            className="flex items-center gap-1 py-4 text-xl"
            onClick={closeNavbar}
          >
            <Link to={"/admin"}>Admin Dashboard</Link>
          </li>

          {user && (
            <a
              href=""
              className="mt-auto hover:text-primary"
              onClick={() => {
                auth.signOut();
              }}
            >
              <div className=" flex items-center gap-2">
                <span>Logout</span> <FiLogOut />
              </div>
            </a>
          )}
        </ul>
      }
    </motion.nav>
  );
};
export default MobileNavbar;
