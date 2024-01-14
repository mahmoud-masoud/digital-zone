import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebase";

const useSignInWithEmailAndPassword = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Wrong password");
      }

      if (error.code === "auth/user-not-found") {
        setError("Email not found");
      }
    }
  };

  return {
    error,
    setError,
    onSubmit,
  };
};
export default useSignInWithEmailAndPassword;
