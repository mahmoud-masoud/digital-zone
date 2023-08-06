import { useParams } from 'react-router-dom';
import data from '../data';
import ProductImagesForMobile from '../components/ProductPageComponents/ProductImagesForMobile';
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
      <ProductImagesForMobile />
      <ProductInfo
        title={item.title}
        price={item.price}
        id={item.id}
        image={item.image}
      />
      <ProductQuickHighlights highlights={item.highlights} />
      <ProductDetails description={item.description} />
    </Wrapper>
  );
};
export default MobileProductPage;
