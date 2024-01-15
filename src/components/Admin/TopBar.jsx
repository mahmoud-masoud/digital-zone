import Wrapper from "../../UI/Wrapper";
import Logo from "../../UI/Logo";
import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

const TopBar = ({ toggleNavbarVisibility }) => {
  return (
    <div
      className="sticky top-0 z-30 flex h-16 w-full items-center
     justify-center bg-primary p-2"
    >
      <div className="flex w-full items-center justify-between md:justify-center ">
        <div className="md:hidden">
          <button onClick={() => toggleNavbarVisibility()}>
            <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
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
