import { Link } from "react-router-dom";
import Logo from "../../UI/Logo";
const TopBar = ({ title }) => {
  return (
    <nav className=" sticky top-0 z-10 h-16 w-full bg-primary shadow-lg">
      <div className="mx-auto flex h-full w-[800px] max-w-full items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
    </nav>
  );
};
export default TopBar;
