import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gamepad2Icon,
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
      gap-2 rounded-b-md border bg-white p-4 text-fontColor shadow"
    >
      <li className="w-[45%]" onClick={closeCategoriesMenu}>
        <div className="relative flex gap-2 rounded p-3 hover:bg-light">
          <Smartphone className=" text-primary" size={25} />
          <span>Mobile Phones</span>
          <Link to={"ct/mobile-phones"} className="absolute inset-0"></Link>
        </div>
      </li>

      <li className="w-[45%] " onClick={closeCategoriesMenu}>
        <div className="relative flex gap-2 rounded p-3 hover:bg-light">
          <Laptop className=" text-primary" size={25} />
          <span>Laptops</span>
          <Link to={"ct/laptops"} className="absolute inset-0"></Link>
        </div>
      </li>

      <li className="w-[45%]" onClick={closeCategoriesMenu}>
        <div className="relative flex gap-2 rounded p-3 hover:bg-light">
          <Headphones className=" text-primary" size={25} />
          <span>Headphones</span>
          <Link to={"ct/headphones"} className="absolute inset-0"></Link>
        </div>
      </li>
      <li className="w-[45%]" onClick={closeCategoriesMenu}>
        <div className="relative flex gap-2 rounded p-3 hover:bg-light">
          <Watch className=" text-primary" size={25} />
          <span>Smart watches</span>
          <Link to={"ct/smart-watches"} className="absolute inset-0"></Link>
        </div>
      </li>
      <li className="w-[45%]" onClick={closeCategoriesMenu}>
        <div className="relative flex gap-2 rounded p-3 hover:bg-light">
          <Gamepad2Icon className=" text-primary" size={25} />
          <span>Gaming</span>
          <Link to={"ct/gaming"} className="absolute inset-0"></Link>
        </div>
      </li>
      <li className="w-[45%]" onClick={closeCategoriesMenu}>
        <div className="relative flex gap-2 rounded p-3 hover:bg-light">
          <Monitor className=" text-primary" size={25} />
          <span>Monitors</span>
          <Link to={"ct/monitors"} className="absolute inset-0"></Link>
        </div>
      </li>
    </motion.ul>
  );
};
export default CategoriesMenu;
