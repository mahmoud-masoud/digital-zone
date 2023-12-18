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
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (user && user.isAnonymous) {
      try {
        const emailCredential = EmailAuthProvider.credential(
          data.email,
          data.password,
        );

        const linkedUser = await linkWithCredential(user, emailCredential);

        setRedirect(true);

        await updateProfile(linkedUser.user, { displayName: data.username });

        const { displayName, email, uid } = linkedUser.user;

        addingUserToUsersCollection(
          { displayName, email, uid, type: "permanent" },
          uid,
        );
        setRedirect(false);
        navigate("/");
      } catch (error) {
        console.error("Error upgrading anonymous account:", error);
        setSignupError(error.code);
      }
    } else if (user && !user.isAnonymous) {
      try {
        await createUser(data);
        setRedirect(false);
        navigate("/");
      } catch (error) {
        setSignupError(error.code);
      }
    }
  };
  return {
    onSubmit,
    signupEmailPassError: signupError,
    setEmailPassSignupError: setSignupError,
    signupEmailPassRedirect: redirect,
  };
};
export default useEmailPassSignup;
