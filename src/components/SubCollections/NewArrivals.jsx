import { useEffect, useState } from "react";
import Wrapper from "../../UI/Wrapper";
import {
  collectionGroup,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

import ProductsCarousel from "./ProductsCarousel";
import { db } from "../../Utils/firebase.js";
import ProductsSkeleton from "./ProductsSkeleton.jsx";

const NewArrivals = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      const q = query(
        collectionGroup(db, "products"),
        orderBy("timestamp", "desc"),
        limit(10),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const updatedProducts = querySnapshot.docs.map((doc) => doc.data());
          setProducts(updatedProducts);
          setIsLoading(false);
        }
      });

      return () => unsubscribe();
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  return (
    <section>
      <Wrapper className="border-b border-gray-100 px-4 py-8 md:py-12">
        {products ? (
          <>
            <h3 className="mb-8 font-semibold text-fontColor md:text-xl">
              New Arrivals
            </h3>
            <ProductsCarousel data={products} />
          </>
        ) : (
          <ProductsSkeleton />
        )}
      </Wrapper>
    </section>
  );
};
export default NewArrivals;
