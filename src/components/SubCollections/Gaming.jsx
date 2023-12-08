import { Link } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import ProductsCarousel from "./ProductsCarousel";
import { collection, doc, limit, onSnapshot, query } from "firebase/firestore";
import { db } from "../../Utils/firebase";
import { useEffect, useState } from "react";
import ProductsSkeleton from "./ProductsSkeleton";

const Gaming = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryRef = doc(db, "categories", "gaming");
    const productsCollectionRef = collection(categoryRef, "products");

    const q = query(productsCollectionRef, limit(10));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => doc.data());
        if (!updatedProducts.length) {
          setError(true);
          return;
        }
        setLoading(false);
        setProducts(updatedProducts);
      },
      (error) => {
        console.error("Firestore Error:", error);
        setLoading(false);
        setError(true);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className=" text-fontColor ">
      <Wrapper
        className={
          "flex flex-col border-b-2 border-gray-100 px-4 py-8 md:py-12"
        }
      >
        <Link to={"ct/gaming"}>
          <div className="mb-12 overflow-hidden rounded-lg md:rounded-xl">
            <img src="/images/new/gaming-banner.png" alt="" />
          </div>
        </Link>

        {products && (
          <div className="flex justify-between">
            <h3 className="mb-8 text-lg font-bold text-fontColor md:text-xl">
              All Gaming
            </h3>

            <span>
              <Link
                to={"ct/gaming"}
                className="font-medium underline hover:text-primary hover:no-underline"
              >
                Show All
              </Link>
            </span>
          </div>
        )}
        {products ? <ProductsCarousel data={products} /> : <ProductsSkeleton />}
      </Wrapper>
    </section>
  );
};
export default Gaming;
