import Navbar from "./NavBar/Navbar";
import SearchBox from "./SearchBox";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../UI/Logo";
import MobileNavbar from "./NavBar/MobileNavbar";
import CartIcon from "./CartIcon";
import { AnimatePresence } from "framer-motion";
import useNoScroll from "../../Hooks/useNoScroll";

const Header = () => {
  const [isInputOnFocus, setInputOnFocus] = useState(false);
  const [navbarIsOpen, setNavbar] = useState(false);

  useNoScroll(navbarIsOpen);

  const handleInputOnFocus = () => {
    setInputOnFocus(false);
  };

  const navHandler = () => {
    setNavbar(!navbarIsOpen);
  };

  const closeNavbar = () => {
    setNavbar(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary max-md:p-4 md:h-[84px]">
      <div className="container relative mx-auto">
        <div
          className="flex flex-wrap items-center gap-2  
            md:flex-row md:justify-between md:gap-4 "
        >
          <button
            className={`z-[1000] text-white sm:hidden ${
              isInputOnFocus && "opacity-0"
            }`}
            onClick={navHandler}
          >
            {!navbarIsOpen && <Bars3Icon className="w-8 stroke-2" />}
          </button>
          <Link to={"/"}>
            <Logo />
          </Link>

          <SearchBox
            isInputOnFocus={isInputOnFocus}
            setInputOnFocus={setInputOnFocus}
            handleInputOnFocus={handleInputOnFocus}
          />

          <AnimatePresence>
            {navbarIsOpen && (
              <MobileNavbar
                closeNavbar={closeNavbar}
                navbarIsOpen={navbarIsOpen}
              />
            )}
          </AnimatePresence>

          <Navbar />

          <CartIcon isInputOnFocus={isInputOnFocus} />
        </div>
      </div>
    </header>
  );
};
export default Header;
