import { useEffect, useState } from "react";
import { auth, db } from "../../Utils/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const useUserInfo = () => {
  const [user] = useAuthState(auth);

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
