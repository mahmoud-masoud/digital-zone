import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useCategory from "../../../Hooks/firebase/useCategory";
import {
  Gamepad2Icon,
  GamepadIcon,
  Headphones,
  Laptop,
  Monitor,
  Smartphone,
  Watch,
} from "lucide-react";

const CategoriesMenu = ({ closeCategoriesMenu }) => {
  return (
    <motion.ul
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "230.50px" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.15, ease: "anticipate" }}
      className="absolute left-1/2 top-full z-40 flex flex-wrap justify-around
      gap-4 rounded-b-md border bg-white p-4 text-fontColor shadow"
    >
      <li
        className="w-[45%] rounded-sm p-2 hover:bg-light"
        onClick={closeCategoriesMenu}
      >
        <Link to={"ct/mobile-phones"}>
          <div className="flex gap-2">
            <Smartphone className=" text-primary" size={25} />
            <span>Mobile Phones</span>
          </div>
        </Link>
      </li>
      <li
        className="w-[45%] rounded-sm p-2 hover:bg-light"
        onClick={closeCategoriesMenu}
      >
        <Link to={"ct/laptops"}>
          <div className="flex gap-2">
            <Laptop className=" text-primary" size={25} />
            <span>Laptops</span>
          </div>
        </Link>
      </li>
      <li
        className="w-[45%] rounded-sm p-2 hover:bg-light"
        onClick={closeCategoriesMenu}
      >
        <Link to={"ct/headphones"}>
          <div className="flex gap-2">
            <Headphones className=" text-primary" size={25} />
            <span>Headphones</span>
          </div>
        </Link>
      </li>
      <li
        className="w-[45%] rounded-sm p-2 hover:bg-light"
        onClick={closeCategoriesMenu}
      >
        <Link to={"ct/smart-watches"}>
          <div className="flex gap-2">
            <Watch className=" text-primary" size={25} />
            <span>Smart watches</span>
          </div>
        </Link>
      </li>
      <li
        className="w-[45%] rounded-sm p-2 hover:bg-light"
        onClick={closeCategoriesMenu}
      >
        <Link to={"ct/gaming"}>
          <div className="flex gap-2">
            <Gamepad2Icon className=" text-primary" size={25} />
            <span>Gaming</span>
          </div>
        </Link>
      </li>
      <li
        className="w-[45%] rounded-sm p-2 hover:bg-light"
        onClick={closeCategoriesMenu}
      >
        <Link to={"ct/gaming"}>
          <div className="flex gap-2">
            <Monitor className=" text-primary" size={25} />
            <span>Monitors</span>
          </div>
        </Link>
      </li>
    </motion.ul>
  );
};
export default CategoriesMenu;
