import { useParams } from 'react-router-dom';

import ProductImages from '../components/ProductPageComponents/ProductImages';
import Wrapper from '../UI/Wrapper';
import ProductInfo from '../components/ProductPageComponents/ProductBuyBox/ProductInfo';
import ProductQuickHighlights from '../components/ProductPageComponents/ProductQuickHighlights';
import ProductDetails from '../components/ProductPageComponents/ProductDetails';

import Loading from '../UI/Loading';
import useProductPage from '../Hooks/useProductPage';

const ProductPage = () => {
  const { product, isLoading, hasError } = useProductPage();

  return isLoading ? (
    <Loading />
  ) : product ? (
    <Wrapper className={'px-3 mb-16 flex gap-4'}>
      <div className='flex gap-8 flex-col w-[70%]'>
        <ProductImages images={product?.images} />
        {product?.highlights && (
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
  ) : (
    <p>No Product Found !</p>
  );
};
export default ProductPage;
