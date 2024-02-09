import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginValidationSchema } from "../../../Utils/zod";
import LightSpinner from "../../../UI/LightSpinner";
import Input from "../../../UI/Input";
import Label from "../../../UI/Label";
import InputError from "../../../UI/InputError";
import PasswordInput from "../../../UI/PasswordInput";

const SignInForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <Label htmlFor={"email"} className={"text-primary"}>
          email address
        </Label>
        <Input
          type="email"
          name="email"
          register={register("email")}
          placeholder="Enter your email address"
          className={"w-full py-3"}
        />
        {errors.email && <InputError message={errors.email?.message} />}
      </div>

      <div>
        <Label htmlFor={"password"} className={"text-primary"}>
          password
        </Label>
        <PasswordInput
          name="password"
          register={register("password")}
          placeholder="password"
          className={"w-full py-3"}
        />
        {errors.password && <InputError message={errors.password?.message} />}
      </div>

      <button
        type="submit"
        className="mt-2 h-12  rounded-lg  border border-gray-400 bg-primary p-1 font-semibold 
      text-white transition-all duration-300 hover:text-white hover:opacity-80"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LightSpinner h={7} w={7} /> : "Login"}
      </button>
    </form>
  );
};
export default SignInForm;
