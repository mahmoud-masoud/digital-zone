import { useEffect, useState } from "react";
import { db } from "../../Utils/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const useOrders = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      const getOrders = async () => {
        const first = query(collection(db, "orders"), orderBy("date", "desc"));

        const documentSnapshots = await getDocs(first);
        if (documentSnapshots) {
          const fetchedData = documentSnapshots.docs.map((doc) => doc.data());
          setData(fetchedData);
          setIsLoading(false);
        }
      };

      getOrders();
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
export default useOrders;
