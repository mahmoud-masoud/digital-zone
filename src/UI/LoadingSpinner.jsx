import { twMerge } from "tailwind-merge";
const LoadingSpinner = ({ className }) => {
  return (
    <div className="flex items-center justify-center">
      <span
        className={twMerge(
          `flex h-8 w-8 animate-spin-fast rounded-full
          border-[3px] border-white border-r-primary border-t-primary`,
          className,
        )}
      ></span>
    </div>
  );
};
export default LoadingSpinner;
