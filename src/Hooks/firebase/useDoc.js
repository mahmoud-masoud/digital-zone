import { useEffect, useState } from "react";
import { db } from "../../Utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useDoc = (docId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const docRef = doc(db, "orders", docId);
        const docItem = await getDoc(docRef);

        if (docItem.exists()) {
          setData(docItem.data());
        }
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    getOrder();
  }, [docId]);

  return { data, isLoading, isError };
};
export default useDoc;
