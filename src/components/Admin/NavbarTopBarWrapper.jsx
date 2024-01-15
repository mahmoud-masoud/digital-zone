import { useState } from "react";
import NavbarPanel from "./NavbarPanel/NavbarPanel";
import TopBar from "./TopBar";
import Backdrop from "../../UI/Backdrop";

const NavbarTopBarWrapper = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNavbarVisibility = () => {
    setNavIsOpen(!navIsOpen);
  };

  return (
    <>
      <TopBar toggleNavbarVisibility={toggleNavbarVisibility} />
      <NavbarPanel navIsOpen={navIsOpen} />
      {navIsOpen && <Backdrop closeModal={toggleNavbarVisibility} />}
    </>
  );
};
export default NavbarTopBarWrapper;
