import Wrapper from "../../UI/Wrapper";
import ProductsCarousel from "./UI/ProductsCarousel.jsx";

import ProductsSkeleton from "./UI/ProductsSkeleton.jsx";
import useSubCollectionProducts from "../../Hooks/firebase/useSubCollectionProducts.js";
import {
  collectionGroup,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Utils/firebaseConfig.js";
import { useMemo } from "react";

const BestSellers = () => {
  const q = useMemo(() => {
    return query(
      collectionGroup(db, "products"),
      where("quantitySold", ">=", 0),
      orderBy("quantitySold", "desc"),
      limit(10),
    );
  }, []);

  const { products } = useSubCollectionProducts(q);

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
