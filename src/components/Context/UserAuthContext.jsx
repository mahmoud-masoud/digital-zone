import { doc, getDoc, runTransaction } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Utils/firebaseConfig";

export const UserAuthContext = createContext({
  user: null,
  isAdmin: false,
  userIsLoading: true,
  userDataIsLoading: true,
  updateUserInfoInDB: () => {},
});

const UserAuthContextProvider = ({ children }) => {
  const [user, isLoading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDataIsLoading, setUserDataIsLoading] = useState(true);

  const updateUserInfoInDB = async (displayName, email) => {
    try {
      const userRefDoc = doc(db, "users", user.uid);
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRefDoc);
        if (!userDoc.exists()) {
          throw "Document does not exist!";
        }

        transaction.update(userRefDoc, { displayName, email });
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userRefDoc = doc(db, "users", user.uid);

        const userDoc = await getDoc(userRefDoc);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserDataIsLoading(false);
          setIsAdmin(userData?.type === "admin");
        } else {
          setUserDataIsLoading(false);
        }
      } catch (error) {
        setUserDataIsLoading(false);
        // console.log(error);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAdmin,
        userIsLoading: isLoading,
        userDataIsLoading,
        updateUserInfoInDB,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
