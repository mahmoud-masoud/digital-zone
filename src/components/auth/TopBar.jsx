import { Link, useLocation } from "react-router-dom";
import Logo from "../../UI/Logo";
import { useEffect, useState } from "react";

const TopBar = () => {
  const [title, setTitle] = useState("Sign up");
  const { pathname } = useLocation();

  useEffect(() => {
    setTitle(getTitle(pathname));
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-10 h-16 w-full bg-primary p-4 shadow-lg">
      <div className="mx-auto flex h-full w-[800px] max-w-full items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          {title}
        </h2>
      </div>
    </nav>
  );
};
export default TopBar;
const getTitle = (pathname) => {
  switch (pathname) {
    case "/signin":
      return "Sign In";
    default:
      return "Sign up";
  }
};
