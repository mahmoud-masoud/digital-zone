import Wrapper from "../../../UI/Wrapper";
import GoogleLogo from "../../../UI/GoogleLogo";
import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";
import useGoogleSignup from "../../../Hooks/firebase/useGoogleSignup";
import RedirectPopup from "../../../UI/RedirectPopup";
import useEmailPassSignup from "../../../Hooks/firebase/useEmailPassSignup";
import { motion } from "framer-motion";

const SignUpCard = () => {
  const {
    signUpWithGoogle,
    userIsSigningUpWithGoogle,
    userError,
    signupError,
    setSignupError,
  } = useGoogleSignup();

  const {
    onSubmit,
    signupEmailPassError,
    setEmailPassSignupError,
    userIsSigningUpWithEmailAndPassword,
  } = useEmailPassSignup();

  return (
    <section className="min-h-screen bg-light">
      <Wrapper className="max-w-lg px-4 py-10">
        {(userIsSigningUpWithGoogle || userIsSigningUpWithEmailAndPassword) && (
          <RedirectPopup />
        )}

        {(signupError || signupEmailPassError) && (
          <div
            className="mb-4 flex justify-between rounded-md bg-red-500 p-3 font-medium
         text-white"
          >
            <p>{signupEmailPassError || signupError}</p>
            <span
              className="cursor-pointer text-2xl"
              onClick={() => {
                setEmailPassSignupError(null);
                setSignupError(null);
              }}
            >
              &times;
            </span>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl bg-white p-8 shadow-lg"
        >
          <h3 className="mb-4 text-xl font-bold text-fontColor md:text-3xl">
            Create your account
          </h3>
          <p className="mb-4 text-gray-600 max-sm:text-sm md:mb-8">
            Sign up and shop on a whole new level.
          </p>
          <button
            className="flex w-full items-center justify-center gap-2
             rounded-lg border border-gray-400 px-1 py-2 font-semibold
          transition-all duration-300 hover:border-after hover:bg-primary
           hover:text-white max-sm:text-sm"
            onClick={signUpWithGoogle}
          >
            <div className="rounded bg-white p-1">
              <GoogleLogo />
            </div>
            Sign Up with Google
          </button>

          <span className="mb-2 mt-4 block text-sm">Or with email</span>

          <SignupForm onSubmit={onSubmit} />

          <p className="mt-2 text-gray-500">
            Already have an account?
            <Link
              to={"/signin"}
              className="ml-3 font-medium text-primary underline hover:no-underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </Wrapper>
    </section>
  );
};
export default SignUpCard;
