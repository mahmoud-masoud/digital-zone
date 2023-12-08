const Backdrop = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-20 bg-black/40" onClick={closeModal}></div>
  );
};
export default Backdrop;
