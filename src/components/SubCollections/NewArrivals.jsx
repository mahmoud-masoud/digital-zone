import { bestSellers } from '../../tempData.js';
import Wrapper from '../../UI/Wrapper';

import ProductsCarousel from './ProductsCarousel';

const NewArrivals = () => {
  return (
    <section className='my-4 md:my-8 px-4'>
      <Wrapper className={'bb-2 pb-8'}>
        <h3 className='mb-8 text-xl font-bold text-fontColor'>New Arrivals</h3>
        <ProductsCarousel data={bestSellers} />
      </Wrapper>
    </section>
  );
};
export default NewArrivals;
