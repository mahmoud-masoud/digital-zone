import Navbar from "./NavBar/Navbar";
import Wrapper from "../../UI/Wrapper";
import SearchBox from "./SearchBox";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { HiMiniBars3 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../UI/Logo";
import MobileNavbar from "./NavBar/MobileNavbar";
import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";
import DropdownViewCart from "../../UI/DropDownViewCart";
import AccountDropDown from "./NavBar/AccountDropDown";

const Header = () => {
  const [isInputOnFocus, setInputOnFocus] = useState(false);
  const [navbarIsOpen, setNavbar] = useState(false);

  const handleInputOnFocus = () => {
    setInputOnFocus(false);
  };

  const navHandler = () => {
    setNavbar(!navbarIsOpen);
  };

  const closeNavbar = () => {
    setNavbar(false);
  };

  // useEffect(() => {
  //   if (navbarIsOpen) {
  //     document.documentElement.style.overflowY = 'hidden';
  //   } else {
  //     document.documentElement.style.overflowY = 'auto';
  //   }

  //   return () => (document.documentElement.style.overflowY = 'auto');
  // }, [navbarIsOpen]);

  return (
    <header className="sticky top-0 z-50 mb-8 bg-primary">
      <div className="container relative mx-auto">
        <div
          className="flex flex-wrap items-center gap-2  
            p-4 md:flex-row md:justify-between md:gap-4 md:p-0"
        >
          <button
            className={`z-[10000] text-white ${isInputOnFocus && "opacity-0"}`}
            onClick={navHandler}
          >
            {!navbarIsOpen && <HiMiniBars3 className="text-3xl md:hidden" />}
          </button>
          <Link to={"/"}>
            <Logo />
          </Link>

          <SearchBox
            isInputOnFocus={isInputOnFocus}
            setInputOnFocus={setInputOnFocus}
            handleInputOnFocus={handleInputOnFocus}
          />

          {navbarIsOpen && (
            <MobileNavbar
              closeNavbar={closeNavbar}
              navbarIsOpen={navbarIsOpen}
            />
          )}
          <Navbar />

          <CartIcon isInputOnFocus={isInputOnFocus} />
        </div>
      </div>
    </header>
  );
};
export default Header;
