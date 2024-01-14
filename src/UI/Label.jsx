import { twMerge } from "tailwind-merge";

const Label = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={twMerge("mb-2 block", className)}>
      {children}
    </label>
  );
};
export default Label;
