import {
  EmailAuthProvider,
  linkWithCredential,
  updateProfile,
} from "firebase/auth";
import useAuthState from "./useAuthState";
import {
  addingUserToUsersCollection,
  createUser,
} from "../../Utils/firebase-functions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Turtle } from "lucide-react";

const useEmailPassSignup = () => {
  const { user, isLoading, isError } = useAuthState();
  const [signupError, setSignupError] = useState(false);
  const [userIsSigningUp, setUserIsSingingUp] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (user && user.isAnonymous) {
      try {
        const emailCredential = EmailAuthProvider.credential(
          data.email,
          data.password,
        );

        const linkedUser = await linkWithCredential(user, emailCredential);

        setUserIsSingingUp(true);

        await updateProfile(linkedUser.user, { displayName: data.username });

        const { displayName, email, uid } = linkedUser.user;

        addingUserToUsersCollection(
          { displayName, email, uid, type: "permanent" },
          uid,
        );
        setUserIsSingingUp(false);
        navigate("/");
      } catch (error) {
        console.error("Error upgrading anonymous account:", error);
        setSignupError(error.code);
      }
    } else if (user && !user.isAnonymous) {
      try {
        await createUser(data);
        setUserIsSingingUp(false);
        navigate("/");
      } catch (error) {
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
export default useEmailPassSignup;
