import { Link } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import ProductsCarousel from "./ProductsCarousel";
import { collection, doc, limit, onSnapshot, query } from "firebase/firestore";
import { db } from "../../Utils/firebase";
import { useEffect, useState } from "react";
import ProductsSkeleton from "./ProductsSkeleton";

const Tablets = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, seIstLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const categoryRef = doc(db, "categories", "tablets");
    const productsCollectionRef = collection(categoryRef, "products");

    const q = query(productsCollectionRef, limit(10));

    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => doc.data());
        if (!updatedProducts.length) {
          setIsError(true);
          return;
        }
        seIstLoading(false);
        setProducts(updatedProducts);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Firestore Error:", error);
      seIstLoading(false);
      setIsError(true);
    }
  }, []);

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
