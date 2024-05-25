import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebaseConfig";

const useSignInWithEmailAndPassword = (navigateFlag = false) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setSuccess(true);
      if (navigateFlag) {
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Wrong password");
      } else if (error.code === "auth/user-not-found") {
        setError("Email not found");
      }
    }
  };

  return {
    error,
    success,
    setError,
    onSubmit,
  };
};
export default useSignInWithEmailAndPassword;
