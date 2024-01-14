import { elementFromString } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

const useMenu = () => {
  const [isMenu, setMenu] = useState(false);

  const elementRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (elementRef.current && elementRef.current.contains(e.target)) {
        setMenu(true);
      } else {
        setMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return { elementRef, isMenu, setMenu };
};
export default useMenu;
