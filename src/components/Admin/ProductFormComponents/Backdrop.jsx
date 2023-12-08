const Backdrop = ({ setIsModalOpen }) => {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/40"
      onClick={() => setIsModalOpen(false)}
    ></div>
  );
};
export default Backdrop;
