import Wrapper from "../../UI/Wrapper.jsx";

import ProductsCarousel from "./UI/ProductsCarousel.jsx";
import ProductsSkeleton from "./UI/ProductsSkeleton.jsx";
import { collectionGroup, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../Utils/firebaseConfig.js";
import useSubCollectionProducts from "../../Hooks/firebase/useSubCollectionProducts.js";
import { useMemo } from "react";

const NewArrivals = () => {
  const q = useMemo(() => {
    return query(
      collectionGroup(db, "products"),
      orderBy("timestamp", "desc"),
      limit(10),
    );
  }, []);

  const { products } = useSubCollectionProducts(q);
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
