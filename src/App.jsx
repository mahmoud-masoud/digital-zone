import Routes from "./components/Routes/Routes";

import { auth, db } from "./Utils/firebase";
import { useEffect } from "react";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import randomUsername from "./Utils/randomUserName";

function App() {
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

  return <Routes />;
}

export default App;
