import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const PasswordInput = ({ className, register, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <input
        className={twMerge(
          `w-full rounded-md border border-slate-400 py-3 pl-3 pr-6 outline-0
      duration-300 hover:border-slate-600 focus:shadow-input max-sm:text-sm`,
          className,
        )}
        type={isVisible ? "text" : "password"}
        autoComplete="true"
        {...props}
        {...register}
      ></input>

      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700"
      >
        {isVisible ? <EyeOff size={20} /> : <EyeIcon size={20} />}
      </button>
    </div>
  );
};
export default PasswordInput;
