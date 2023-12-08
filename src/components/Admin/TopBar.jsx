import Wrapper from "../../UI/Wrapper";
import Logo from "../../UI/Logo";
import { Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { useState } from "react";

const TopBar = ({ toggleNavbarVisibility }) => {
  return (
    <div
      className="sticky top-0 z-30 flex h-16 w-full items-center
     justify-center bg-primary p-2"
    >
      <div className="flex w-full items-center justify-between md:justify-center ">
        <div className="md:hidden">
          <button onClick={() => toggleNavbarVisibility()}>
            <HiMiniBars3 className="text-3xl text-white" />
          </button>
        </div>

        <div className="flex items-center justify-between md:gap-20">
          <Link to="/">
            <Logo />
          </Link>
          <p className="text-xl font-semibold text-white">Admin dashboard</p>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
