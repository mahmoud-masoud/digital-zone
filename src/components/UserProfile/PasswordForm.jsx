import { useForm } from "react-hook-form";
import PasswordInput from "../../UI/PasswordInput";
import Label from "../../UI/Label";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Utils/firebaseConfig";
import { updatePassword } from "firebase/auth";
import LightSpinner from "../../UI/LightSpinner";
import InputError from "../../UI/InputError";
import { useState } from "react";
import SignInModal from "./SignInModal";
import Toast from "../../UI/Toast";

const PasswordForm = () => {
  const [user] = useAuthState(auth);

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async ({ password }) => {
    try {
      await updatePassword(user, password);

      setIsSuccess(true);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setIsOpen(true);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} key={isOpen}>
        <div className="max-w-md">
          <Label className="text-sm">New Password</Label>
          <PasswordInput
            register={register("password", {
              required: true,
              maxLength: 20,
              minLength: 8,
            })}
          />
          {errors.password && (
            <InputError message={"Password must be 8 char at least"} />
          )}
        </div>

        <button
          disabled={!password}
          className={`mt-6 rounded bg-primary px-4 py-2 text-white duration-150
     hover:bg-after disabled:cursor-not-allowed disabled:bg-primary/50`}
        >
          {isSubmitting ? <LightSpinner /> : "Update"}
        </button>
      </form>

      {isOpen && (
        <SignInModal
          title={" Re-Sing In To Update Password"}
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}

      {isSuccess && (
        <Toast setToastVisibility={setIsSuccess}>
          Password updated successfully
        </Toast>
      )}
    </>
  );
};
export default PasswordForm;
