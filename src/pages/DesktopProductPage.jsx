import { useLocation, useParams } from 'react-router-dom';
import data from '../data';
import ProductImages from '../components/ProductPageComponents/ProductImages';
import Wrapper from '../UI/Wrapper';
import ProductInfo from '../components/ProductPageComponents/ProductBuyBox/ProductInfo';
import ProductQuickHighlights from '../components/ProductPageComponents/ProductQuickHighlights';
import ProductDetails from '../components/ProductPageComponents/ProductDetails';
import { useEffect, useState } from 'react';
import { getProduct } from '../Utils/firebase-functions';

const ProductPage = () => {
  const productId = useParams().productId;
  const location = useLocation();
  const pathAfterDomain = location.pathname.split('/');
  const category = pathAfterDomain[1];

  // const item = data.find((item) => item.id == productId);
  // if (!item) {
  //   return <p> Item not found</p>;
  // }

  const [item, setItem] = useState();

  useEffect(() => {
    const getProductData = async () => {
      const resData = await getProduct(category, productId);
      setItem(resData);
    };
    getProductData();
  }, []);

  return (
    <Wrapper className={'px-3 mb-16 flex gap-4'}>
      <div className='flex gap-8 flex-col w-[70%]'>
        <ProductImages images={item?.images} />
        <ProductQuickHighlights highlights={item?.highlights} />
        <ProductDetails description={item?.description} />
      </div>
      <ProductInfo
        title={item?.title}
        price={item?.price}
        id={item?.id}
        image={item?.images[0]}
      />
    </Wrapper>
  );
};
export default ProductPage;
