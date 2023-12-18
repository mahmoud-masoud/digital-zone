import { useEffect, useState } from "react";
import { auth } from "../../Utils/firebase";
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
        } else {
          // console.log("user is not logged in");
        }
      } catch (error) {
        setIsError(true);
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe();
    };
  }, []); // Empty dependency array to run only once during mount

  return { user, isLoading, isError };
};

export default useAuthState;
