import { twMerge } from "tailwind-merge";

const Input = ({ className, register, ...props }) => {
  return (
    <input
      className={twMerge(
        `focus:shadow-input rounded-md border border-slate-400 px-3 py-2
      outline-0 duration-300 hover:border-slate-600`,
        className,
      )}
      {...props}
      {...register}
    ></input>
  );
};
export default Input;
