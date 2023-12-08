import { Link } from "react-router-dom";
import { FaRegHeart, FaAngleDown } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import CategoriesMenu from "./CategoriesMenu";
import { useEffect, useState } from "react";
import AccountDropDown from "./AccountDropDown";
import { auth } from "../../../Utils/firebase";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import { useAuthState } from "react-firebase-hooks/auth";
import useNoScroll from "../../../Hooks/useNoScroll";
const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [isAccountDropDown, setIsAccountDropDown] = useState(false);

  useNoScroll(isAccountDropDown || dropDownMenu);

  const closeAccountDropDown = () => {
    setIsAccountDropDown(false);
  };
  const openAccountDropDown = () => {
    setIsAccountDropDown(true);
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
      className="hidden md:block 
      md:h-auto md:w-auto md:bg-inherit md:p-0 md:pt-0 md:text-white
      "
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
          <button
            className="account-drop-menu flex items-center gap-1 rounded-full
           px-4 py-1.5  text-[16px] font-normal hover:bg-after hover:text-white focus:bg-after focus:text-white"
            onClick={() => setIsAccountDropDown(true)}
          >
            {loading && <LoadingSpinner />}

            {!user && !loading && (
              <div className="flex flex-col items-center justify-center text-sm">
                <BsPersonFill className="text-xl" />
                Sign in
              </div>
            )}

            {user && (
              <div>
                {user.photoURL ? (
                  <div className="h-12 w-12 overflow-hidden  rounded-full">
                    <img
                      src={`${user.photoURL}`}
                      alt="google account user image"
                      className="max-w-full"
                    />
                  </div>
                ) : (
                  <p>Hi, {user.displayName}</p>
                )}
              </div>
            )}
          </button>

          {isAccountDropDown && (
            <AccountDropDown
              isAccountDropdown={isAccountDropDown}
              closeAccountDropDown={closeAccountDropDown}
              openAccountDropDown={openAccountDropDown}
            />
          )}
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
