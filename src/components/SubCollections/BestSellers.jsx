import { Suspense, useEffect, useState } from "react";

import Wrapper from "../../UI/Wrapper";

import ProductsCarousel from "./ProductsCarousel";
import {
  collectionGroup,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Utils/firebase.js";

import ProductsSkeleton from "./ProductsSkeleton";

const BestSellers = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      const q = query(
        collectionGroup(db, "products"),
        where("quantitySold", ">=", 0),
        orderBy("quantitySold", "desc"),
        limit(10),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
  }, []);

  return (
    <section>
      <Wrapper className="border-b-2 border-gray-100 px-4 py-8 md:py-12">
        {products ? (
          <>
            <h3 className="mb-8 font-semibold text-fontColor md:text-xl">
              Best Sellers
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
export default BestSellers;
