import { useEffect, useState } from "react";
import { auth } from "../../Utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          setIsLoading(false);
        } else {
          // console.log("user is not logged in");
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.log("error");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading, isError };
};

export default useAuthState;
