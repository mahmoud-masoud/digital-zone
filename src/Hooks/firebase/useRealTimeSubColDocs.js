import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../Utils/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useRealTimeSubColDocs = (subColName) => {
  const [user, isLoading, isError] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user || user?.isAnonymous) return;

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      const collectionRef = collection(userRef, subColName);

      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const docsData = querySnapshot.docs.map((doc) => doc.data());
        setData(docsData);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, [user, isLoading]);

  return {
    data,
    loading,
    error,
  };
};
export default useRealTimeSubColDocs;
