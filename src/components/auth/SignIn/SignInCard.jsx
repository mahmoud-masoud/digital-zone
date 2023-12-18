import Wrapper from "../../../UI/Wrapper";
import GoogleLogo from "../../../UI/GoogleLogo";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googlAuthProvider } from "../../../Utils/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useId, useState } from "react";
import FormInput from "../CreateAccount/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../../Utils/zod";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import InputError from "../../../UI/InputError";
import { doc, getDoc, query, setDoc } from "firebase/firestore";
import { AwardIcon } from "lucide-react";

const SignInCard = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPasswordError(false);
      setEmailError(false);
      navigate("/");
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/wrong-password") {
        setPasswordError(true);
        setEmailError(false);
      }

      if (error.code === "auth/user-not-found") {
        setEmailError(true);
        setPasswordError(false);
      }
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googlAuthProvider);
      const userId = response.user.uid;

      const userDocRef = doc(db, "users", userId);

      const userDocRes = await getDoc(userDocRef);

      if (userDocRes.exists()) {
        navigate("/");
      } else {
        const { displayName, email, uid, metadata } = response.user;
        await setDoc(userDocRef, {
          displayName,
          email,
          uid,
          metadata: { ...metadata },
          type: "permanent",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen bg-light">
      <Wrapper className="max-w-md px-4 pt-24">
        <div className="rounded-xl bg-white p-8 shadow-lg md:min-w-[450px]">
          <h3 className="mb-4 text-2xl font-bold text-fontColor md:text-3xl">
            Log in to your account
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormInput
              inputType={"email"}
              label={"email address"}
              name={"email"}
              placeholder={"Enter your email address"}
              register={register("email")}
              errors={errors}
            />
            {emailError && <InputError message={"Email not found"} />}

            <FormInput
              inputType={"Password"}
              label={"password"}
              name={"password"}
              placeholder={"Enter a password"}
              register={register("password")}
              errors={errors}
            />
            {passwordError && <InputError message={"Password is wrong"} />}

            <button
              className="mt-2 h-12  rounded-lg  border border-gray-400 bg-primary p-1 font-semibold 
              text-white transition-all duration-300 hover:text-white hover:opacity-80"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner h={7} w={7} /> : "Login"}
            </button>
          </form>
          <hr className="mt-6" />
          <button
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-400
             px-1 py-2 font-semibold
          transition-all duration-300 hover:bg-primary hover:text-white"
            onClick={() => signUpWithGoogle()}
          >
            <div className="rounded-[4px] bg-white p-[.2rem]">
              <GoogleLogo />
            </div>
            Sign In with Google
          </button>

          <p className="mt-2 text-gray-500">
            Don't have an account?
            <Link
              to={"/signup"}
              className="ml-3 font-medium text-primary underline hover:no-underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Wrapper>
    </section>
  );
};
export default SignInCard;
