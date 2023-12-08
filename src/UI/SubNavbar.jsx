import { ChevronLeft } from "lucide-react";
import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";
const SubNavbar = ({ heading }) => {
  return (
    <nav className="sticky top-0 z-50  flex h-14 items-center justify-center bg-primary">
      <Wrapper>
        <div className="flex items-center gap-4 text-white">
          <div
            className="rounded-md p-1 transition duration-150 hover:bg-white
           hover:bg-opacity-10 "
          >
            <Link to={-1}>
              <ChevronLeft size={32} />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center ">
            <h1 className="text-xl font-medium ">Checkout</h1>
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};
export default SubNavbar;
