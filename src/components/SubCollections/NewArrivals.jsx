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

  useEffect(() => {
    // Create a query to retrieve the last 10 added products
    const q = query(
      collectionGroup(db, "products"),
      orderBy("timestamp", "desc"),
      limit(10),
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        return;
      }
      const updatedProducts = querySnapshot.docs.map((doc) => doc.data());
      setProducts(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section>
      <Wrapper className="border-b border-gray-100 px-4 py-8 md:py-12">
        {products ? (
          <>
            <h3 className="mb-8 text-xl font-bold text-fontColor">
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
