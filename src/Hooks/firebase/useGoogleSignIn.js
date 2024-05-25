import { signInWithPopup } from "firebase/auth";
import { auth, db, googlAuthProvider } from "../../Utils/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useGoogleSignIn = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googlAuthProvider);
      setIsSigningIn(true);
      const userId = response.user.uid;
      const userDocRef = doc(db, "users", userId);
      const userDocRes = await getDoc(userDocRef);

      if (userDocRes.exists()) {
        setIsSigningIn(false);
        navigate("/");
      } else {
        const { displayName, email, uid, metadata } = response.user;
        await setDoc(userDocRef, {
          displayName,
          email,
          uid,
          metadata: { ...metadata },
          type: "regular",
        });
        setIsSigningIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { signInWithGoogle, isSigningIn };
};
export default useGoogleSignIn;
