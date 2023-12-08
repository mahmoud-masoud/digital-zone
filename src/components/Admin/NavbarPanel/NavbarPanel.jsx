import { NavLink } from "react-router-dom";
import { FaBackwardStep, FaBoxesStacked } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { Home, HomeIcon, Users, Users2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "../../../UI/Backdrop";

const NavbarPanel = ({ navIsOpen }) => {
  return (
    <div
      className={`${
        navIsOpen ? "block" : "hidden"
      } fixed top-16 z-30 h-screen w-64
     flex-shrink-0 bg-zinc-200 p-4 md:block`}
    >
      <nav>
        <ul className="flex flex-col gap-3">
          <li>
            <NavLink
              end
              to={"/admin"}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? "bg-white" : "hover:bg-white hover:bg-opacity-40"
                }`;
              }}
            >
              <div
                className="flex items-center gap-3 px-4 py-1 
              "
              >
                <GoHomeFill className="text-xl text-gray-600" />

                <span className="text font-medium">Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to={"orders"}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? "bg-white" : "hover:bg-white hover:bg-opacity-40"
                }`;
              }}
            >
              <div className="flex items-center gap-3  px-4 py-1">
                <FaBoxesStacked className="text-xl text-gray-600" />
                <span className=" font-medium">Orders</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to={"products"}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? "bg-white" : "hover:bg-white hover:bg-opacity-40"
                }`;
              }}
            >
              <div className="flex items-center gap-3  px-4 py-1">
                <IoMdPricetags className="text-xl" />
                <span className=" font-medium">Products</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="users"
              className={({ isActive }) => {
                return `block rounded-lg stroke-black transition ${
                  isActive
                    ? "bg-white fill-none "
                    : "fill-black hover:bg-white hover:bg-opacity-40"
                }`;
              }}
            >
              <div className="flex items-center gap-3 px-4 py-1">
                {/* <BsPeopleFill className="text-xl text-gray-600" /> */}
                <Users className="fill-inherit stroke-inherit" />
                <span className=" font-medium">Users</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NavbarPanel;
