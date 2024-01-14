const ErrorPopup = ({ message, setIsVisible }) => {
  return (
    <div className="mb-4 flex justify-between rounded-lg bg-rose-500 p-3 text-white">
      {message}
      <span
        className="cursor-pointer text-2xl"
        onClick={() => setIsVisible(false)}
      >
        &times;
      </span>
    </div>
  );
};
export default ErrorPopup;
