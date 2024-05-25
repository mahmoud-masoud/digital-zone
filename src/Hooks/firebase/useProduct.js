import { useEffect, useState } from "react";
import { db } from "../../Utils/firebaseConfig";
import { collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

const useProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState();
  const productId = useParams().productId;

  useEffect(() => {
    const q = query(
      collectionGroup(db, "products"),
      where("id", "==", productId),
    );

    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          setProduct(productData);
        } else {
          setError(404);
        }

        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }, []);

  return { product, isLoading, error };
};
export default useProduct;
