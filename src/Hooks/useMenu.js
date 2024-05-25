import { useEffect, useRef, useState } from "react";

const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const elementRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (elementRef.current && elementRef.current.contains(e.target)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return { elementRef, isOpen, setIsOpen };
};
export default useMenu;
