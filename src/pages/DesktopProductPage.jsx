import { useParams } from "react-router-dom";

import ProductImages from "../components/ProductPageComponents/ProductImages";
import Wrapper from "../UI/Wrapper";
import ProductInfo from "../components/ProductPageComponents/ProductBuyBox/ProductInfo";
import ProductQuickHighlights from "../components/ProductPageComponents/ProductQuickHighlights";
import ProductDetails from "../components/ProductPageComponents/ProductDetails";

import MainSpinner from "../UI/MainSpinner";
import useProduct from "../Hooks/useProduct";

const ProductPage = () => {
  const { product, isLoading, isError } = useProduct();

  if (isLoading) return <MainSpinner />;
  if (isError) return <p>Something went wrong refresh the page</p>;
  if (!product && !isError && !isLoading) return <p>product not found</p>;
  console.log(product.highlights.length);
  return (
    <Wrapper className={"mb-16 flex gap-4 px-3 pt-8"}>
      <div className="flex w-2/3 flex-col gap-8">
        <ProductImages images={product?.images} />
        {product.highlights?.length && (
          <ProductQuickHighlights highlights={product.highlights} />
        )}
        <ProductDetails
          description={product?.description}
          features={product?.features}
        />
      </div>
      <ProductInfo
        title={product?.title}
        price={product?.price}
        id={product?.id}
        image={product?.images[0]}
        quantity={product?.quantity}
      />
    </Wrapper>
  );
};
export default ProductPage;
