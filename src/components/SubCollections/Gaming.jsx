import { Link } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import ProductsCarousel from "./ProductsCarousel";
import { collection, doc, limit, onSnapshot, query } from "firebase/firestore";
import { db } from "../../Utils/firebase";
import { useEffect, useState } from "react";
import ProductsSkeleton from "./ProductsSkeleton";

const Gaming = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, seIstLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const categoryRef = doc(db, "categories", "gaming");
    const productsCollectionRef = collection(categoryRef, "products");

    const q = query(productsCollectionRef, limit(10));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => doc.data());
        if (!updatedProducts.length) {
          setIsError(true);
          return;
        }
        seIstLoading(false);
        setProducts(updatedProducts);
      },
      (error) => {
        console.error("Firestore Error:", error);
        seIstLoading(false);
        setIsError(true);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className=" text-fontColor ">
      <Wrapper className={"border-b-2 border-gray-100 px-4 py-8 md:py-12"}>
        <Link to={"ct/gaming"}>
          <div className="mb-12 overflow-hidden rounded-lg md:rounded-xl">
            <picture>
              <source
                srcSet="/images/illustration/gaming-sm.webp"
                type="image/webp"
                media="(max-width: 770px)"
                height="300"
                width="800"
              />
              <img
                src="/images/illustration/gaming.webp"
                alt="Carousel banner image"
                type="image/webp"
                height="350"
                width="1400"
              />
            </picture>
          </div>
        </Link>

        {products && (
          <div className="flex justify-between">
            <h3 className="mb-8 font-semibold text-fontColor md:text-xl">
              All Gaming
            </h3>

            <Link
              to={"ct/gaming"}
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
export default Gaming;
