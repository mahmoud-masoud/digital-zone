import { useEffect, useState } from 'react';

const useDropDown = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);

  useEffect(() => {
    const closeDroPDownMenuClickOutSide = (e) => {
      if (!e.target.closest('.drop-menu')) setDropDownMenu(false);
    };
    document.addEventListener('click', closeDroPDownMenuClickOutSide);
    return () => {
      document.removeEventListener('click', closeDroPDownMenuClickOutSide);
    };
  }, []);

  const closeDropDownMenu = () => {
    setDropDownMenu(false);
  };

  const openDropDownMenu = () => {
    setDropDownMenu(true);
  };
  return [dropDownMenu, closeDropDownMenu, openDropDownMenu];
};
export default useDropDown;
