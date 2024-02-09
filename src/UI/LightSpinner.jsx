import { twMerge } from "tailwind-merge";
const LightSpinner = ({ className }) => {
  return (
    <div className="flex items-center justify-center">
      <span
        className={twMerge(
          `flex h-8 w-8 animate-spin-fast rounded-full
          border-[3px] border-white/40 border-r-white border-t-white`,
          className,
        )}
      ></span>
    </div>
  );
};
export default LightSpinner;
