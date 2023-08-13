import { useParams } from 'react-router-dom';
import data from '../data';
import ProductImages from '../components/ProductPageComponents/ProductImages';
import Wrapper from '../UI/Wrapper';
import ProductInfo from '../components/ProductPageComponents/ProductBuyBox/ProductInfo';
import ProductQuickHighlights from '../components/ProductPageComponents/ProductQuickHighlights';
import ProductDetails from '../components/ProductPageComponents/ProductDetails';

const ProductPage = () => {
  const productId = useParams().productId;
  const item = data.find((item) => item.id == productId);
  if (!item) {
    return <p> Item not found</p>;
  }
  return (
    <Wrapper className={'px-3 mb-16 flex gap-4'}>
      <div className='flex gap-8 flex-col w-[70%]'>
        <ProductImages image={item.image} />
        <ProductQuickHighlights highlights={item.highlights} />
        <ProductDetails description={item.description} />
      </div>
      <ProductInfo
        title={item.title}
        price={item.price}
        id={item.id}
        image={item.image}
      />
    </Wrapper>
  );
};
export default ProductPage;
