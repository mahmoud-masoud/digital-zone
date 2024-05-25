import { useEffect, useState } from "react";
import { db } from "../../Utils/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

const useCategory = () => {
  // category name form url
  const { category } = useParams();

  const [products, setProducts] = useState(null);
  const [maxProductsCount, setMaxProductsCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingNextProducts, setLoadingNextProducts] = useState(false);
  const [lastDocVisible, setLastDocVisible] = useState(null);
  const [atTheEnd, setAtTheEnd] = useState(false);

  const fetchProducts = async (lastVisible = null) => {
    setLoadingNextProducts(true);
    try {
      const categoryRef = doc(db, "categories", category);
      const productsCollectionRef = collection(categoryRef, "products");

      const productsDocsCountSnapshot = await getCountFromServer(
        productsCollectionRef,
      );
      setMaxProductsCount(productsDocsCountSnapshot.data().count);

      let q = query(productsCollectionRef, orderBy("title"), limit(8));

      if (lastVisible) {
        q = query(
          productsCollectionRef,
          orderBy("title"),
          limit(8),
          startAfter(lastVisible),
        );
      }

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const fetchedProducts = querySnapshot.docs.map((doc) => doc.data());
        setProducts((prevProducts) =>
          lastVisible ? [...prevProducts, ...fetchedProducts] : fetchedProducts,
        );
        const lastVisibleDoc =
          querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDocVisible(lastVisibleDoc);
      } else {
        setAtTheEnd(true);
        if (!products) {
          setError(404);
        }
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
    maxProductsCount,
    fetchMoreProducts,
    loading,
    error,
    loadingNextProducts,
    atTheEnd,
  };
};

export default useCategory;
