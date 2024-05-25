import {
  EmailAuthProvider,
  linkWithCredential,
  updateProfile,
} from "firebase/auth";
import { addingUserToUsersCollection } from "../../Utils/firebase-functions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Utils/firebaseConfig";

const useSignupWithEmailAndPassword = () => {
  const [user] = useAuthState(auth);

  const [signupError, setSignupError] = useState(false);
  const [userIsSigningUp, setUserIsSingingUp] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async ({ email: enteredEmail, password, username }) => {
    if (user && user.isAnonymous) {
      try {
        const emailCredential = EmailAuthProvider.credential(
          enteredEmail,
          password,
        );

        await linkWithCredential(user, emailCredential);

        setUserIsSingingUp(true);

        await updateProfile(user, { displayName: username });

        const { displayName, email, uid } = user;

        addingUserToUsersCollection({
          displayName,
          email,
          uid,
          type: "regular",
        });
        setUserIsSingingUp(false);
        navigate("/");
      } catch (error) {
        console.error(error);
        setSignupError(error.code);
      }
    }
  };
  return {
    onSubmit,
    userIsSigningUpWithEmailAndPassword: userIsSigningUp,
    signupEmailPassError: signupError,
    setEmailPassSignupError: setSignupError,
  };
};
export default useSignupWithEmailAndPassword;
