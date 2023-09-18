import { useEffect, useState } from 'react';
import { db } from '../Utils/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const useCategory = (category) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const smartWatchesDocRef = doc(db, 'categories', category);
    const productsCollectionRef = collection(smartWatchesDocRef, 'products');

    const unsubscribe = onSnapshot(
      productsCollectionRef,
      (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => doc.data());
        if (!updatedProducts.length) {
          console.log('use category ', updatedProducts);
          setError(true);
        }
        setLoading(false);
        setProducts(updatedProducts);
      },
      (error) => {
        console.error('Firestore Error:', error);
        setLoading(false);
        setError(true);
      }
    );

    return () => unsubscribe();
  }, []);

  return { products, loading, error };
};

export default useCategory;
