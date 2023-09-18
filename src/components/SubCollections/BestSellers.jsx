import { bestSellers } from '../../tempData.js';
import Wrapper from '../../UI/Wrapper';

import ProductsCarousel from './ProductsCarousel';

const BestSellers = () => {
  return (
    <section className='my-4 md:my-8 px-4'>
      <Wrapper className={'bb-2 pb-8'}>
        <h3 className='mb-8 text-xl font-bold text-fontColor'>Best Sellers</h3>
        <ProductsCarousel data={bestSellers} />
      </Wrapper>
    </section>
  );
};
export default BestSellers;
