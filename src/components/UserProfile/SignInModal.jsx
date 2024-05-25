import BackDrop from "../../UI/Backdrop";
import SignInForm from "../auth/SignIn/SignInForm";
import { useEffect, useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Utils/firebaseConfig";

const SignInModal = ({ isOpen, closeModal, openModal, onSuccess, title }) => {
  const [user] = useAuthState(auth);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const ReAuthOnSubmitHandler = async ({ email, password }) => {
    const credential = EmailAuthProvider.credential(email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      setIsSuccess(true);
    } catch (error) {
      setError(error.code);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      onSuccess();
    }
  }, [isSuccess, closeModal, onSuccess]);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <BackDrop closeModal={closeModal} />
        <div className="relative w-full max-w-md rounded-xl bg-white p-8">
          <h2 className="mb-4 text-xl font-medium">{title}</h2>

          {error && (
            <p className="my-2 text-lg font-medium text-rose-500">{error}</p>
          )}

          <SignInForm onSubmit={ReAuthOnSubmitHandler} errorMessage={error} />

          <button
            className="absolute right-4 top-2 text-3xl"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
