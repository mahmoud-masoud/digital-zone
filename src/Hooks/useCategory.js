import { useEffect, useState } from "react";
import { db } from "../Utils/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

const useCategory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingNextProducts, setLoadingNextProducts] = useState(false);
  const [lastDocVisible, setLastDocVisible] = useState(null);
  const [atTheEnd, setAtTheEnd] = useState(false);
  const { category } = useParams();

  const fetchProducts = async (lastVisible = null) => {
    setLoadingNextProducts(true);

    try {
      const categoryRef = doc(db, "categories", category);
      const productsCollectionRef = collection(categoryRef, "products");

      let q = query(productsCollectionRef, orderBy("title"), limit(20));

      if (lastVisible) {
        q = query(
          productsCollectionRef,
          orderBy("title"),
          limit(20),
          startAfter(lastVisible),
        );
      }

      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map((doc) => doc.data());

      if (fetchedProducts.length === 0) {
        setAtTheEnd(true);
      } else {
        setProducts((prevProducts) =>
          lastVisible ? [...prevProducts, ...fetchedProducts] : fetchedProducts,
        );
        const lastVisibleDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDocVisible(lastVisibleDoc);
      }

      setLoading(false);
      setLoadingNextProducts(false);
    } catch (error) {
      console.error("Firestore Error:", error);
      setError(true);
      setLoading(false);
      setLoadingNextProducts(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setAtTheEnd(false);
    fetchProducts();
  }, [category]);

  const fetchMoreProducts = () => {
    fetchProducts(lastDocVisible);
  };

  return {
    products,
    fetchMoreProducts,
    loading,
    error,
    loadingNextProducts,
    atTheEnd,
  };
};

export default useCategory;
