import { useEffect, useState } from "react";
import { db } from "../Utils/firebase";
import { collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

const useProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [product, setProduct] = useState();
  const productId = useParams().productId;

  useEffect(() => {
    // Create a query to fetch the product by ID
    const q = query(
      collectionGroup(db, "products"),
      where("id", "==", productId),
    );

    // Subscribe to real-time updates with onSnapshot
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          setProduct(productData);

          setIsLoading(false);
        } else {
          // Product not found
          console.log("There is no document with this ID");
          setProduct(null); // Reset data if not found
          setIsLoading(false);
        }
      });

      return () => unsubscribe();
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  }, []);

  return { product, isLoading, hasError };
};
export default useProduct;
