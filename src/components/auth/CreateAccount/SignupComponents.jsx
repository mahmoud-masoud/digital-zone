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
} from "firebase/auth";

import SignupForm from "./SignupForm";

import { doc, setDoc } from "firebase/firestore";

const SignupComponents = () => {
  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googlAuthProvider);
      const { displayName, email, uid } = userCredential.user;
      const docRef = doc(db, "users", uid);
      await setDoc(docRef, { displayName, email, uid });

      console.log("Document written with ID: ", uid);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen bg-slate-50">
      <Wrapper className="flex items-center justify-center px-4 pt-24">
        <div className="rounded-xl bg-white p-8 shadow-lg md:min-w-[450px]">
          <h3 className="mb-4 text-3xl font-bold text-fontColor">
            Create your account
          </h3>
          <p className="mb-8 text-gray-600">
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

          <SignupForm />

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
