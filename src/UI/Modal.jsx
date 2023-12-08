import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
const Modal = ({ children, closeModal }) => {
  return createPortal(
    <>
      <Backdrop closeModal={closeModal}></Backdrop>
      <div
        className="fixed right-1/2 top-1/2 z-50 -translate-y-1/2 translate-x-1/2"
        open={true}
      >
        <div className="px-2">{children}</div>
      </div>
    </>,
    document.getElementById("modal"),
  );
};
export default Modal;
