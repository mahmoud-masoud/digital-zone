import { useEffect } from "react";

const useNoScroll = (check) => {
  useEffect(() => {
    if (!check) return;
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "auto");
  }, [check]);
};
export default useNoScroll;
