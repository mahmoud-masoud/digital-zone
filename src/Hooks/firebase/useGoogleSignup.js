import { useState } from "react";
import useAuthState from "./useAuthState";
import { linkWithPopup, updateProfile } from "firebase/auth";
import randomUsername from "../../Utils/randomUserName";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, googlAuthProvider } from "../../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { TbArrowIteration } from "react-icons/tb";

const useGoogleSignup = () => {
  const { user, isLoading, isError } = useAuthState();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    try {
      const response = await linkWithPopup(user, googlAuthProvider);
      setRedirect(true);
      const { email, uid } = response.user;
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, { email: email, type: "permanent" });
      navigate("/");
      setRedirect(false);
    } catch (error) {
      console.log(error);
      console.log(error.code);
      setError(error.code);
    }
  };

  return {
    signUpWithGoogle,
    userError: isError,
    userRedirect: redirect,
    signupError: error,
    setSignupError: setError,
  };
};
export default useGoogleSignup;
