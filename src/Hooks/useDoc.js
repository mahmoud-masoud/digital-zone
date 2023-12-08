import { useEffect, useState } from "react";
import { db } from "../Utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const useDoc = (docId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  console.log(data, "from useDoc");

  useEffect(() => {
    const getOrder = async () => {
      try {
        const docRef = doc(db, "orders", docId);
        const docItem = await getDoc(docRef);

        if (docItem.exists()) {
          setData(docItem.data());
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getOrder();
  }, [docId]);

  return { data, isLoading, isError };
};
export default useDoc;
