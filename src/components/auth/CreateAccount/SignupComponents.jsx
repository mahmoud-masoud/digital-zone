import Wrapper from "../../../UI/Wrapper";
import GoogleLogo from "../../../UI/GoogleLogo";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../../../Utils/firebase";
import { googlAuthProvider } from "../../../Utils/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  linkWithCredential,
  GoogleAuthProvider,
  linkWithPopup,
  deleteUser,
  getAuth,
  getIdToken,
} from "firebase/auth";

import SignupForm from "./SignupForm";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import useAuthState from "../../../Hooks/firebase/useAuthState";
import randomUsername from "../../../Utils/randomUserName";
import useGoogleSignup from "../../../Hooks/firebase/useGoogleSignup";
import RedirectPopup from "../../../UI/RedirectPopup";
import { Turtle } from "lucide-react";
import useEmailPassSignup from "../../../Hooks/firebase/useEmailPassSignup";

const SignupComponents = () => {
  const {
    signUpWithGoogle,
    signupError,
    setSignupError,
    userError,
    userRedirect,
  } = useGoogleSignup();

  const {
    onSubmit,
    signupEmailPassError,
    setEmailPassSignupError,
    signupEmailPassRedirect,
  } = useEmailPassSignup();

  return (
    <section className="min-h-screen bg-light">
      <Wrapper className="max-w-lg px-4 py-10">
        {signupError ||
          (signupEmailPassError && (
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
          ))}
        {userRedirect || (signupEmailPassRedirect && <RedirectPopup />)}
        <div className="rounded-xl bg-white  p-8 shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-fontColor md:text-3xl">
            Create your account
          </h3>
          <p className="mb-8 text-sm text-gray-600 sm:text-[1rem]">
            Sign up and shop on a whole new level.
          </p>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-400
            px-1 py-2 font-semibold
          transition-all duration-300 hover:border-after hover:bg-primary hover:text-white"
            onClick={signUpWithGoogle}
          >
            <div className="rounded-[4px] bg-white p-[3px]">
              <GoogleLogo />
            </div>
            Sign Up with Google
          </button>

          <span className="mb-2 mt-4 block text-sm">Or with email</span>

          <SignupForm onSubmit={onSubmit} />

          <p className="mt-2 text-gray-500">
            Already have an account?
            <Link
              to={"/login"}
              className="ml-3 font-medium text-primary underline hover:no-underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Wrapper>
    </section>
  );
};
export default SignupComponents;
