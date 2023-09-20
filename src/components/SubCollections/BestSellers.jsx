import { bestSellers } from '../../tempData.js';
import Wrapper from '../../UI/Wrapper';

import ProductsCarousel from './ProductsCarousel';

const BestSellers = () => {
  return (
    <section>
      <Wrapper className='py-8 md:py-12 px-4 border-b-2 border-gray-100'>
        <h3 className='mb-8 text-xl font-bold text-fontColor'>Best Sellers</h3>
        <ProductsCarousel data={bestSellers} />
      </Wrapper>
    </section>
  );
};
export default BestSellers;
