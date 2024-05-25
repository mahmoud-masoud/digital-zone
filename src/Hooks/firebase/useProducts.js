import { collectionGroup, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Utils/firebaseConfig";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const productsRef = collectionGroup(db, "products");
    const q = query(productsRef);

    try {
      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        const allProducts = querySnapshot.docs.map((doc) => doc.data());
        setProducts(allProducts);
        setLoading(false);
      });

      return unSubscribe;
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, []);

  return { products, setProducts, isError: error, isLoading: loading };
};
export default useProducts;
