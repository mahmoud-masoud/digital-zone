import { useEffect, useState } from "react";
import { db } from "../Utils/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const useDocs = (collectionName) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      const getDocsData = async () => {
        const collectionRef = query(collection(db, collectionName));

        const documentSnapshots = await getDocs(collectionRef);
        if (documentSnapshots) {
          const fetchedData = documentSnapshots.docs.map((doc) => doc.data());
          setData(fetchedData);
          setIsLoading(false);
        }
      };

      getDocsData();
    } catch (error) {
      console.log("error", error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [db]);

  return {
    data,
    setData,
    isLoading,
    isError,
  };
};
export default useDocs;
