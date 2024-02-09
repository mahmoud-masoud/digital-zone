import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Utils/firebase";
import { signInAnonymously, updateProfile } from "firebase/auth";
import randomUsername from "../../Utils/randomUserName.js";
const useAnonymousLogin = () => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const createAnonymousUser = async () => {
      try {
        const response = await signInAnonymously(auth);
        const anonymousUser = response.user;
        await updateProfile(anonymousUser, {
          displayName: randomUsername(),
        });
        const { displayName, uid, metadata } = anonymousUser;
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, {
          displayName,
          uid,
          type: "anonymous",
          metadata: { ...metadata },
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (!user && !loading) {
      createAnonymousUser();
    }
  }, [user, loading]);
};
export default useAnonymousLogin;
