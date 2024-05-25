import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { addingUserToUsersCollection } from "../../Utils/firebase-functions";
import { auth } from "../../Utils/firebaseConfig";

const useCreateNewUser = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async ({
    username,
    email,
    password,
    type,
    address = "N/A",
  }) => {
    setIsCreating(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(user, { displayName: username });

      const uid = user.uid;
      const timestamp = user.metadata.creationTime;

      addingUserToUsersCollection({
        username,
        email,
        uid,
        address,
        type,
        timestamp,
      });

      setIsCreating(false);
    } catch (error) {
      setIsError(error);
    }
  };

  return { onSubmit, isCreating, isError };
};
export default useCreateNewUser;
