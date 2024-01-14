import { useState } from "react";
import useAuthState from "./useAuthState";
import { linkWithPopup } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db, googlAuthProvider } from "../../Utils/firebase";
import { useNavigate } from "react-router-dom";

const useGoogleSignup = () => {
  const { user, isLoading, isError } = useAuthState();
  const [userIsSigningUp, setUserIsSingingUp] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    try {
      const response = await linkWithPopup(user, googlAuthProvider);
      setUserIsSingingUp(true);
      const { email, uid } = response.user;
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, { email: email, type: "permanent" });
      navigate("/");
      setUserIsSingingUp(false);
    } catch (error) {
      setError(error.code);
    }
  };

  return {
    signUpWithGoogle,
    userIsSigningUpWithGoogle: userIsSigningUp,
    userError: isError,
    signupError: error,
    setSignupError: setError,
  };
};
export default useGoogleSignup;
