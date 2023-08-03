import { useParams } from 'react-router-dom';
import data from '../data';
import ProductImages from '../components/ProductPageComponents/ProductImages';
import Wrapper from '../UI/Wrapper';
import ProductInfo from '../components/ProductPageComponents/ProductBuyBox/ProductInfo';
import ProductQuickHighlights from '../components/ProductPageComponents/ProductQuickHighlights';
import ProductDetails from '../components/ProductPageComponents/ProductDetails';

const MobileProductPage = () => {
  const productId = useParams().productId;
  const item = data.find((item) => item.id == productId);
  if (!item) {
    return <p> Item not found</p>;
  }
  return (
    <Wrapper className={'px-3 mb-16 flex flex-col gap-4 '}>
      <ProductImages image={item.image} />
      <ProductInfo title={item.title} price={item.price} />
      <ProductQuickHighlights highlights={item.highlights} />
      <ProductDetails description={item.description} />
    </Wrapper>
  );
};
export default MobileProductPage;
