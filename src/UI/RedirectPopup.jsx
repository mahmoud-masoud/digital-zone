import { createPortal } from "react-dom";

const RedirectPopup = () => {
  return createPortal(
    <div
      className="fixed left-1/2 top-20 w-auto -translate-x-1/2 rounded-sm
   bg-teal-500 p-2 text-white"
    >
      <p>Please wait you will redirected</p>
    </div>,
    document.getElementById("modal"),
  );
};
export default RedirectPopup;
