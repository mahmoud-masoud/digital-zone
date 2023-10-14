import ProductImagesForMobile from '../components/ProductPageComponents/ProductImagesForMobile';
import Wrapper from '../UI/Wrapper';
import ProductInfo from '../components/ProductPageComponents/ProductBuyBox/ProductInfo';
import ProductQuickHighlights from '../components/ProductPageComponents/ProductQuickHighlights';
import ProductDetails from '../components/ProductPageComponents/ProductDetails';
import useProduct from '../Hooks/useProduct';
import Loading from '../UI/Loading';

const MobileProductPage = () => {
  const { product, isLoading, hasError } = useProduct();
  console.log(product);
  return isLoading ? (
    <Loading />
  ) : product ? (
    <>
      <Wrapper className={'px-3 mb-16 flex flex-col gap-4 '}>
        <ProductImagesForMobile images={product.images} />
        <ProductInfo
          title={product.title}
          price={product.price}
          id={product.id}
          image={product.images[0]}
        />
        <ProductQuickHighlights highlights={product.highlights} />
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
