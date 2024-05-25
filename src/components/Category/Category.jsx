import Wrapper from "../../UI/Wrapper";
import useCategory from "../../Hooks/firebase/useCategory";
import FilterProductsSelect from "./FilterProductsSelect";
import { useEffect, useState } from "react";
import PageSpinner from "../../UI/PageSpinner";
import NotFoundPage from "../../Pages/NotFoundPage";
import ProductCard from "./ProductCard";
import BlueSpinner from "../../UI/BlueSpiner";

const Category = () => {
  const {
    products,
    maxProductsCount,
    fetchMoreProducts,
    loading,
    error,
    loadingNextProducts,
  } = useCategory();

  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (!products) return;
    setSortedProducts([...products]);
  }, [products]);

  const getFilteredValue = ({ filter }) => {
    const newSortedProducts = [...sortedProducts];
    switch (filter) {
      case "Price Low":
        newSortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price High":
        newSortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Best Seller":
        newSortedProducts.sort((a, b) => b?.quantitySold - a?.quantitySold);
        break;
      case "Best Match":
        setSortedProducts([...products]);
        return;
      default:
        break;
    }
    setSortedProducts(newSortedProducts);
  };

  if (loading) return <PageSpinner />;
  if (error === 404) return <NotFoundPage />;
  if (error && error !== 404)
    return <p>Something went wrong refresh the page</p>;

  const isMoreProducts = maxProductsCount > products.length;

  return (
    <section className="min-h-screen py-8 pb-20">
      <Wrapper className={"p-2"}>
        <FilterProductsSelect getFilteredValue={getFilteredValue} />
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
        {isMoreProducts && (
          <div className="flex justify-center">
            <button
              onClick={() => fetchMoreProducts()}
              className="mt-20 min-w-[112px] rounded-full border-2 border-primary bg-white
               px-4 py-1.5
            text-primary duration-100 hover:bg-light"
            >
              {loadingNextProducts ? <BlueSpinner /> : "Load more"}
            </button>
          </div>
        )}
      </Wrapper>
    </section>
  );
};
export default Category;
