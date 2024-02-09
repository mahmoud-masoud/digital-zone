import { NavLink } from "react-router-dom";

import {
  UsersIcon,
  InboxStackIcon,
  HomeIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeOutline,
  InboxStackIcon as InboxStackOutline,
  TagIcon as TagOutline,
  UsersIcon as UsersOutline,
} from "@heroicons/react/24/outline";

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
              {({ isActive }) => (
                <div className="flex items-center gap-3 px-4 py-1">
                  {isActive ? (
                    <HomeOutline className="h-7 w-7  text-slate-700" />
                  ) : (
                    <HomeIcon className="h-7 w-7 fill-slate-700" />
                  )}
                  <span className="text font-medium">Home</span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"orders"}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? "bg-white" : "hover:bg-white hover:bg-opacity-40"
                }`;
              }}
            >
              {({ isActive }) => (
                <div className="flex items-center gap-3 px-4 py-1">
                  {isActive ? (
                    <InboxStackOutline className="h-7 w-7 text-slate-700" />
                  ) : (
                    <InboxStackIcon className="h-7 w-7 fill-slate-700" />
                  )}
                  <span className="text font-medium">Orders</span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"products"}
              className={({ isActive }) => {
                return `block rounded-lg transition ${
                  isActive ? "bg-white" : "hover:bg-white hover:bg-opacity-40"
                }`;
              }}
            >
              {({ isActive }) => (
                <div className="flex items-center gap-3 px-4 py-1">
                  {isActive ? (
                    <TagOutline className="h-7 w-7 text-slate-700" />
                  ) : (
                    <TagIcon className="h-7 w-7 fill-slate-700 " />
                  )}
                  <span className="text font-medium">Products</span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className={({ isActive }) => {
                return `block rounded-lg stroke-black transition ${
                  isActive
                    ? "bg-white fill-none "
                    : "fill-black hover:bg-white hover:bg-opacity-40"
                }`;
              }}
            >
              {({ isActive }) => (
                <div className="flex items-center gap-3 px-4 py-1">
                  {isActive ? (
                    <UsersOutline className="h-7 w-7 text-slate-700" />
                  ) : (
                    <UsersIcon className="h-7 w-7 fill-slate-700" />
                  )}
                  <span className="text font-medium">Users</span>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NavbarPanel;
