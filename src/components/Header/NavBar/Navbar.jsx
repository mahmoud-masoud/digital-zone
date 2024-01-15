import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import CategoriesMenu from "./CategoriesMenu";
import { useEffect, useState } from "react";
import AccountDropDown from "./AccountDropDown";
import { auth } from "../../../Utils/firebase";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import useNoScroll from "../../../Hooks/useNoScroll";
import { AnimatePresence } from "framer-motion";
import useMenu from "../../../Hooks/useMenu";
import { HeartIcon, ChevronDown } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user, isLoading, isError] = useAuthState(auth);

  const {
    elementRef: categoriesMenuRef,
    isMenu: categoriesMenu,
    setMenu: setCategoriesMenu,
  } = useMenu();

  const {
    elementRef: accountDropdownRef,
    isMenu: isAccountDropdown,
    setMenu: setAccountDropdown,
  } = useMenu();

  const closeAccountDropDown = () => {
    setAccountDropdown(false);
  };
  const closeCategoriesMenu = () => {
    setCategoriesMenu(false);
  };

  useNoScroll(isAccountDropdown);

  return (
    <nav
      className="hidden 
      h-full md:block md:h-auto md:w-auto md:bg-inherit md:p-2 md:text-white"
    >
      <ul
        className="flex items-center justify-center 
      gap-2 px-0"
      >
        <li tabIndex={0} className="drop-menu" ref={categoriesMenuRef}>
          <button
            className="flex items-end gap-0.5 rounded-full px-4 py-1.5 text-[16px]
           font-normal hover:bg-after  hover:text-white focus:bg-after  focus:text-white"
            onClick={() => setCategoriesMenu(!categoriesMenu)}
          >
            <div className="flex items-center gap-1">
              <span>Categories</span> <ChevronDown />
            </div>
          </button>

          <AnimatePresence>
            {categoriesMenu && (
              <CategoriesMenu closeCategoriesMenu={closeCategoriesMenu} />
            )}
          </AnimatePresence>
        </li>

        <li
          className="
          flex items-center gap-1 rounded-full px-4
           py-1.5  text-[16px] font-normal hover:bg-after hover:text-white focus:bg-after focus:text-white"
        >
          <Link to={"favorites"}>
            <div className="flex items-center justify-center gap-2">
              <HeartIcon size={20} />
              List
            </div>
          </Link>
        </li>

        <li>
          <div
            ref={accountDropdownRef}
            className="flex h-[52px] min-w-[76px] items-center justify-center"
          >
            <button
              className=" flex items-center gap-1 rounded-full
           px-4 py-1.5  text-[16px] font-normal hover:bg-after hover:text-white focus:bg-after focus:text-white"
              onClick={() => setAccountDropdown(true)}
            >
              {isLoading && <LoadingSpinner />}

              {(auth.currentUser?.isAnonymous || auth.currentUser === null) &&
                !isLoading && (
                  <div className="flex flex-col items-center justify-center text-sm">
                    <UserIcon className="w-5" />
                    Sign in
                  </div>
                )}

              {auth.currentUser && !auth.currentUser?.isAnonymous && (
                <p>Hi, {auth.currentUser.displayName}</p>
              )}
            </button>

            {isAccountDropdown && (
              <AccountDropDown closeAccountDropDown={closeAccountDropDown} />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
