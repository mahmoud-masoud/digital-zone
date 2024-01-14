import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../Utils/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { faL } from "@fortawesome/free-solid-svg-icons";

const useFavorites = () => {
  const [user, isLoading, isError] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user || user?.isAnonymous) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const collectionRef = collection(userRef, "favorites");

      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const docsData = querySnapshot.docs.map((doc) => doc.data());
        console.log("test");
        setData(docsData);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, [user]);

  return {
    data,
    loading,
    error,
  };
};
export default useFavorites;
