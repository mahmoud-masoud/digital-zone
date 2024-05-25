import { useState } from "react";
import SignInModal from "./SignInModal";
import { deleteUser } from "firebase/auth";
import useUserAuthContext from "../../Hooks/firebase/useUserAuthContext";
import Toast from "../../UI/Toast";
import DeleteUserModal from "./DeleteUserModal";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const { user, userIsLoading, userDataIsLoading } = useUserAuthContext();

  // Re-sign in modal states
  const [isOpen, setIsOpen] = useState(false);
  const [isReAuthSuccess, setReAuthSuccess] = useState(false);

  // Delete  modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isToastOpen, setIsToastOpen] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(user);
      setIsToastOpen(true);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setIsOpen(true);
      }
    }
  };

  const deleteAccountConfirmHandler = () => {
    if (isReAuthSuccess) {
      setIsDeleteModalOpen(true);
    } else {
      openModal();
    }
  };
  const onSuccessReAuthSuccess = () => {
    setReAuthSuccess(true);
  };

  return (
    <div>
      <button
        onClick={deleteAccountConfirmHandler}
        className=" rounded bg-rose-500 px-4 py-2 text-white
  duration-150 hover:bg-rose-600"
      >
        Delete Account
      </button>
      {isOpen && (
        <SignInModal
          title={"Re-Sing In To Delete Your Account"}
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
          onSuccess={onSuccessReAuthSuccess}
        />
      )}

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={deleteAccount}
      />
    </div>
  );
};
export default DeleteAccount;
