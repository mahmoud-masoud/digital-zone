import Wrapper from "../../UI/Wrapper";
import useCategory from "../../Hooks/firebase/useCategory";
import FilterProductsSelect from "./FilterProductsSelect";
import { useEffect, useState } from "react";
import LightSpinner from "../../UI/LightSpinner";
import PageSpinner from "../../UI/PageSpinner";
import NotFoundPage from "../../Pages/NotFoundPage";
import ProductCard from "./ProductCard";

const Category = () => {
  const {
    products,
    setProducts,
    fetchMoreProducts,
    loading,
    error,
    loadingNextProducts,
    atTheEnd,
  } = useCategory();

  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (!products) return;
    setSortedProducts([...products]);
  }, [products]);

  const getFilterValue = (value) => {
    if (value == "price-low") {
      sortedProducts.sort((a, b) => a.price - b.price);
      setSortedProducts([...sortedProducts]);
    }
    if (value == "price-high") {
      sortedProducts.sort((a, b) => b.price - a.price);
      setSortedProducts([...sortedProducts]);
    }
    if (value == "best-seller") {
      sortedProducts.sort((a, b) => b?.quantitySold - a?.quantitySold);
      setSortedProducts([...sortedProducts]);
    }
    if (value == "best-match") {
      setProducts([...products]);
    }
  };

  if (loading) return <PageSpinner />;
  if (error === 404) return <NotFoundPage />;
  if (error && error !== 404)
    return <p>Something went wrong refresh the page</p>;

  return (
    <section className="min-h-screen py-8 pb-20">
      <Wrapper className={"p-2"}>
        <FilterProductsSelect getFilterValue={getFilterValue} />
        <div
          className="grid grid-cols-2 gap-10 bg-white p-4 md:grid-cols-3 
          lg:grid-cols-4"
        >
          {sortedProducts?.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                img={product.images[0]}
                price={product.price}
                title={product.title}
              />
            </div>
          ))}
        </div>
        {!atTheEnd && (
          <div className="flex justify-center">
            <button
              onClick={() => fetchMoreProducts()}
              className="mt-20 min-w-[112px] rounded-full bg-slate-600 px-4 py-1.5
            text-white duration-100 hover:bg-slate-700"
            >
              {loadingNextProducts ? <LightSpinner /> : "Load more"}
            </button>
          </div>
        )}
      </Wrapper>
    </section>
  );
};
export default Category;
