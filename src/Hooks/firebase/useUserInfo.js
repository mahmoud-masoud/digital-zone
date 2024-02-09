import { useEffect, useState } from "react";
import { auth, db } from "../../Utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const useUserInfo = () => {
  const [user, { loading: userLoading, error: userError }] = useAuthState(auth);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (userDoc) => {
        if (userDoc.exists()) {
          const fetchedUserInfo = userDoc.data();
          setUserInfo(fetchedUserInfo);
        }
      },
      (error) => {
        console.error("Error getting user document:", error);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return userInfo;
};
export default useUserInfo;
