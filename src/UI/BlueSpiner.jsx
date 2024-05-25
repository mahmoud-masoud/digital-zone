import { twMerge } from "tailwind-merge";
const BlueSpinner = ({ className }) => {
  return (
    <div className="flex items-center justify-center">
      <span
        className={twMerge(
          `flex h-7 w-7 animate-spin-fast rounded-full
          border-[3px] border-primary/40 border-r-primary border-t-primary`,
          className,
        )}
      ></span>
    </div>
  );
};
export default BlueSpinner;
