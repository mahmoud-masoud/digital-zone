import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useSubCollectionProducts = (productsQuery) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(productsQuery, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs.map((doc) => doc.data());
          setProducts(productData);
          setIsLoading(false);
        }
      });

      return () => unsubscribe;
    } catch (error) {
      setIsError(false);
      setIsLoading(false);
    }
  }, [productsQuery]);

  return { products, isLoading, isError };
};
export default useSubCollectionProducts;
