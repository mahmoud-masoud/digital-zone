import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidationSchema } from "../../../Utils/zod";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUser } from "../../../Utils/firebase-functions";
import { useState } from "react";
import InputError from "../../../UI/InputError";
import LoadingSpinner from "../../../UI/LoadingSpinner";

const SignupForm = () => {
  const [emailIsExist, setEmailIsExist] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupValidationSchema),
  });

  const onSubmit = async (data) => {
    const res = await createUser(data);
    if (res === "auth/email-already-in-use") {
      setEmailIsExist(true);
      return;
    }

    setEmailIsExist(false);
    navigate("/");
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          inputType={"text"}
          label={"name"}
          name={"username"}
          placeholder={"Enter your username"}
          register={register("username")}
          errors={errors}
          emailIsExist={emailIsExist}
        />

        <div>
          <FormInput
            inputType={"email"}
            label={"email address"}
            name={"email"}
            placeholder={"Enter your email address"}
            register={register("email")}
            errors={errors}
          />
          {emailIsExist && (
            <InputError message={"Email is already exist login instead"} />
          )}
        </div>

        <FormInput
          inputType={"Password"}
          label={"password"}
          name={"password"}
          placeholder={"Enter a password"}
          register={register("password")}
          errors={errors}
        />

        <button
          className="mt-2 h-12  rounded-lg  border border-gray-400 bg-primary p-1 font-semibold 
              text-white transition-all duration-300 hover:text-white hover:opacity-80"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingSpinner h={7} w={7} /> : "Sign up"}
        </button>
      </form>
    </div>
  );
};
export default SignupForm;
