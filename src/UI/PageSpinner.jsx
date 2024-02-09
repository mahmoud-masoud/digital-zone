const PageSpinner = () => {
  return (
    <div
      className={`absolute right-1/2 top-1/2 z-10 flex -translate-y-1/2
       translate-x-1/2 items-center justify-center`}
    >
      <span
        className="h-10 w-10 animate-spin-fast rounded-full border-4 
      border-white border-x-primary"
      ></span>
    </div>
  );
};
export default PageSpinner;
