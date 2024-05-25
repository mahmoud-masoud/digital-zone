import { Link } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import ProductsCarousel from "./UI/ProductsCarousel";
import { collection, doc, limit, query } from "firebase/firestore";
import { db } from "../../Utils/firebaseConfig";

import ProductsSkeleton from "./UI/ProductsSkeleton";
import useSubCollectionProducts from "../../Hooks/firebase/useSubCollectionProducts";
import { useMemo } from "react";

const Tablets = () => {
  const categoryRef = doc(db, "categories", "tablets");

  const q = useMemo(() => {
    return query(collection(categoryRef, "products"), limit(10));
  }, []);

  const { products } = useSubCollectionProducts(q);

  return (
    <section className=" text-fontColor ">
      <Wrapper className={"border-b-2 border-gray-100 px-4 py-8 md:py-12"}>
        {products && (
          <div className="flex justify-between">
            <h3 className="mb-8 font-semibold text-fontColor md:text-xl">
              Tablets
            </h3>

            <Link
              to={"ct/monitors"}
              className="font-medium underline hover:text-primary hover:no-underline"
            >
              Show All
            </Link>
          </div>
        )}
        {products ? <ProductsCarousel data={products} /> : <ProductsSkeleton />}
      </Wrapper>
    </section>
  );
};
export default Tablets;
