import { twMerge } from "tailwind-merge";
const LoadingSpinner = ({ className }) => {
  return (
    <span
      className={twMerge(
        `h-7 w-7 animate-spin-fast rounded-full border-[3px]
          border-white border-r-primary border-t-primary`,
        className,
      )}
    ></span>
  );
};
export default LoadingSpinner;
