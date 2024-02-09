import Wrapper from "../../../UI/Wrapper";
import GoogleLogo from "../../../UI/GoogleLogo";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import useSignInWithEmailAndPassword from "../../../Hooks/firebase/useSignInWithEmailAndPassword";
import ErrorPopup from "../../../UI/ErrorPopup";
import useGoogleSignIn from "../../../Hooks/firebase/useGoogleSignin";
import RedirectPopup from "../../../UI/RedirectPopup";
import { motion } from "framer-motion";

const SignInCard = () => {
  const { onSubmit, error, setError } = useSignInWithEmailAndPassword();
  const { signInWithGoogle, isSigningIn } = useGoogleSignIn();

  return (
    <section className="h-screen bg-light">
      <Wrapper className="max-w-md px-4 py-10">
        {isSigningIn && <RedirectPopup />}
        {error && <ErrorPopup message={error} setIsVisible={setError} />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-md bg-white p-6 shadow-lg md:min-w-[450px] md:rounded-xl md:p-8"
        >
          <h3 className="mb-4 text-xl font-bold text-fontColor md:text-3xl">
            Login to your account
          </h3>

          <SignInForm onSubmit={onSubmit} />
          <hr className="mt-6" />
          <button
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-400
             px-1 py-2 font-semibold
          transition-all duration-300 hover:bg-primary hover:text-white max-sm:text-sm"
            onClick={() => signInWithGoogle()}
          >
            <div className="rounded bg-white p-0.5">
              <GoogleLogo />
            </div>
            Sign In with Google
          </button>

          <p className="mt-2 text-gray-500 max-sm:text-sm">
            Don't have an account?
            <Link
              to={"/signup"}
              className="ml-3 font-medium text-primary underline hover:no-underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </Wrapper>
    </section>
  );
};
export default SignInCard;
