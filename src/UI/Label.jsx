import { twMerge } from "tailwind-merge";

const Label = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={twMerge("mb-2 block", className)}>
      <span className="text-sm font-semibold">{children}</span>
    </label>
  );
};
export default Label;
