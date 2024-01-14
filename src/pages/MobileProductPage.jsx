import ProductImagesForMobile from "../components/ProductPageComponents/ProductImagesForMobile";
import Wrapper from "../UI/Wrapper";
import ProductInfo from "../components/ProductPageComponents/ProductBuyBox/ProductInfo";
import ProductQuickHighlights from "../components/ProductPageComponents/ProductQuickHighlights";
import ProductDetails from "../components/ProductPageComponents/ProductDetails";
import useProduct from "../Hooks/useProduct";
import MainSpinner from "../UI/MainSpinner";

const MobileProductPage = () => {
  const { product, isLoading, isError } = useProduct();
  console.log(product);
  return isLoading ? (
    <MainSpinner />
  ) : product ? (
    <>
      <Wrapper className={"mb-16 flex flex-col gap-4 px-3 "}>
        <ProductImagesForMobile images={product.images} />
        <ProductInfo
          title={product.title}
          price={product.price}
          id={product.id}
          image={product.images[0]}
        />
        {/* {product.highlights?.length && (
          <ProductQuickHighlights highlights={product.highlights} />
        )} */}
        <ProductDetails
          description={product.description}
          features={product?.features}
        />
      </Wrapper>
    </>
  ) : (
    <p>No Product Found !</p>
  );
};
export default MobileProductPage;
