import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../Utils/firebase";
import { useEffect, useState } from "react";
import useAuthState from "./useAuthState";

const useRealTimeSubColDocs = (subColName) => {
  const { user, isLoading, isError } = useAuthState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  console.log(data);

  useEffect(() => {
    if (user && !user.isAnonymous)
      try {
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
        setError(true);
      }
  }, [user, isLoading]);

  return {
    data,
    loading,
    error,
  };
};
export default useRealTimeSubColDocs;
