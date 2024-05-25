import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidationSchema } from "../../../Utils/zod";
import LightSpinner from "../../../UI/LightSpinner";
import Label from "../../../UI/Label";
import Input from "../../../UI/Input";
import PasswordInput from "../../../UI/PasswordInput";
import InputError from "../../../UI/InputError";

const SignupForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupValidationSchema),
  });

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor={"username"} className={"text-primary"}>
            name
          </Label>
          <Input
            type="text"
            name="username"
            autoComplete="off"
            register={register("username")}
            placeholder="Enter your username"
            className={"w-full py-3"}
          />
          {errors.username && <InputError message={errors.username?.message} />}
        </div>

        <div>
          <Label htmlFor={"email"} className={"text-primary"}>
            email address
          </Label>
          <Input
            type="email"
            name="email"
            autoComplete="email"
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
          className="mt-2 h-12  rounded-lg  border border-gray-400 bg-primary p-1 font-semibold 
              text-white transition-all duration-300 hover:text-white hover:opacity-80"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LightSpinner h={7} w={7} /> : "Sign up"}
        </button>
      </form>
    </div>
  );
};
export default SignupForm;
