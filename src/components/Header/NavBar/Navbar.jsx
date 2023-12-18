import { Link } from "react-router-dom";
import { FaRegHeart, FaAngleDown } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import CategoriesMenu from "./CategoriesMenu";
import { useEffect, useState } from "react";
import AccountDropDown from "./AccountDropDown";
import { auth } from "../../../Utils/firebase";
import LoadingSpinner from "../../../UI/LoadingSpinner";

import useNoScroll from "../../../Hooks/useNoScroll";
import useAuthState from "../../../Hooks/firebase/useAuthState";
const Navbar = () => {
  const { user, isLoading, isError } = useAuthState(auth);

  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [accountDropDown, setAccountDropDown] = useState(false);

  useNoScroll(accountDropDown || dropDownMenu);

  const closeAccountDropDown = () => {
    setAccountDropDown(false);
  };
  const openAccountDropDown = () => {
    setAccountDropDown(true);
  };

  const closeDropDownMenuHandler = () => {
    setDropDownMenu(false);
  };

  useEffect(() => {
    const closeDroPDownMenuClickOutSide = (e) => {
      if (!e.target.closest(".drop-menu")) setDropDownMenu(false);
    };
    document.addEventListener("click", closeDroPDownMenuClickOutSide);
    return () => {
      document.removeEventListener("click", closeDroPDownMenuClickOutSide);
    };
  }, []);

  useEffect(() => {
    const closeDroPDownMenuClickOutSide = (e) => {
      if (!e.target.closest(".account-drop-menu")) closeAccountDropDown();
    };
    document.addEventListener("click", closeDroPDownMenuClickOutSide);
    return () => {
      document.removeEventListener("click", closeDroPDownMenuClickOutSide);
    };
  }, []);

  return (
    <nav
      className="hidden 
      h-full md:block md:h-auto md:w-auto md:bg-inherit md:p-4 md:text-white"
    >
      <ul
        className="flex items-center justify-center 
      gap-2 px-0"
      >
        <li tabIndex={0} className="drop-menu">
          <button
            className="flex items-end gap-0.5 rounded-full px-4 py-1.5 text-[16px]
           font-normal hover:bg-after  hover:text-white focus:bg-after  focus:text-white"
            onClick={() => setDropDownMenu(!dropDownMenu)}
          >
            <span>Categories</span> <FaAngleDown />
          </button>

          {dropDownMenu && (
            <CategoriesMenu
              setDropDownMenu={setDropDownMenu}
              closeDropDownMenuHandler={closeDropDownMenuHandler}
            />
          )}
        </li>

        <li
          className="
          rounded-full px-4 py-1.5 text-[16px] font-normal
           hover:bg-after hover:text-white focus:bg-after focus:text-white"
        >
          <Link to={"deals"} className="">
            Deals
          </Link>
        </li>

        <li
          className="
          rounded-full px-4 py-1.5 text-[16px] font-normal
           hover:bg-after  hover:text-white focus:bg-after focus:text-white"
        >
          <Link to={"contact"}>Contact</Link>
        </li>

        <li
          className="
          flex items-center gap-1 rounded-full px-4
           py-1.5  text-[16px] font-normal hover:bg-after hover:text-white focus:bg-after focus:text-white"
        >
          <Link to={"favorites"}>
            <div className="flex items-center justify-center gap-2">
              <FaRegHeart />
              List
            </div>
          </Link>
        </li>

        <li>
          <div className="">
            <button
              className="account-drop-menu flex items-center gap-1 rounded-full
           px-4 py-1.5  text-[16px] font-normal hover:bg-after hover:text-white focus:bg-after focus:text-white"
              onClick={() => setAccountDropDown(true)}
            >
              {isLoading && <LoadingSpinner />}

              {(auth.currentUser?.isAnonymous || auth.currentUser === null) &&
                !isLoading && (
                  <div className="flex flex-col items-center justify-center text-sm">
                    <BsPersonFill className="text-xl" />
                    Sign in
                  </div>
                )}

              {auth.currentUser && !auth.currentUser?.isAnonymous && (
                <p>Hi, {auth.currentUser.displayName}</p>
              )}
            </button>

            {accountDropDown && (
              <AccountDropDown
                accountDropdown={accountDropDown}
                closeAccountDropDown={closeAccountDropDown}
                openAccountDropDown={openAccountDropDown}
              />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
